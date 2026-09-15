const { chromium } = require("playwright");

(async () => {
    console.log("1. Starting Edge...");

    const browser = await chromium.launch({
        channel: "msedge",
        headless: false
    });

    const page = await browser.newPage();

    console.log("2. Opening ChatGPT...");

    await page.goto("https://chatgpt.com/", {
        waitUntil: "domcontentloaded"
    });

    await page.waitForTimeout(3000);

    console.log("3. ChatGPT loaded");
    console.log("URL:", page.url());

    // ================================
    // UPLOAD IMAGE
    // ================================

    console.log("4. Looking for file input...");

    const fileInput = page.locator('input[type="file"]').first();

    await fileInput.waitFor({
        state: "attached",
        timeout: 30000
    });

    console.log("5. File input found");

    console.log("6. Uploading: prescription.png");

    await fileInput.setInputFiles("prescription.png");

    console.log("7. IMAGE UPLOADED");

    // Give ChatGPT time to process the attachment
    await page.waitForTimeout(2000);

    // ================================
    // MESSAGE BOX
    // ================================

    console.log("8. Looking for message box...");

    const textbox = page.getByRole("textbox", {
        name: "Chat with ChatGPT"
    });

    await textbox.waitFor({
        state: "visible",
        timeout: 30000
    });

    console.log("9. Message box found!");

    // ================================
    // PROMPT
    // ================================

    const prompt = `
Analyze the uploaded prescription image.

Extract every medicine that is clearly visible.

Return ONLY valid JSON.
Do not use markdown.
Do not include explanations.
Do not guess missing information.

Use exactly this structure:

{
  "medicines": [
    {
      "name": "",
      "strength": "",
      "quantity": "",
      "frequency": "",
      "timing": "",
      "instructions": ""
    }
  ]
}

Rules:
- Only include medicines actually visible in the image.
- If a field cannot be read, use an empty string.
- Do not infer or invent information.
`;

    await textbox.fill(prompt);

    console.log("10. Prompt entered!");

    // ================================
    // SEND
    // ================================

    const form = page.locator('form[data-has-attachments]');

    await form.waitFor({
        state: "attached",
        timeout: 30000
    });

    console.log("11. Sending prompt...");

    await form.evaluate(form => {
        form.requestSubmit();
    });

    console.log("12. Prompt sent!");

    // ================================
    // WAIT FOR RESPONSE
    // ================================

    const response = page
        .locator('[data-assistant-markdown]')
        .last();

    await response.waitFor({
        state: "visible",
        timeout: 60000
    });

    console.log("13. Waiting for response...");

    let previousText = "";
    let stableCount = 0;

    while (stableCount < 3) {
        const currentText = await response.innerText();

        if (currentText === previousText) {
            stableCount++;
        } else {
            stableCount = 0;
            previousText = currentText;
        }

        await page.waitForTimeout(1000);
    }

    const responseText = previousText.trim();

    console.log("14. Response received:");
    console.log(responseText);

    // ================================
    // PARSE JSON
    // ================================

    let result;

    try {
        result = JSON.parse(responseText);
    } catch (error) {
        console.error("Failed to parse JSON.");
        console.error(responseText);
        await browser.close();
        process.exit(1);
    }

    console.log("15. FINAL JSON:");
    console.log(JSON.stringify(result, null, 2));

    await browser.close();
})();