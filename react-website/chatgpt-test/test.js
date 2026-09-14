const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

(async () => {
    const imagePath = process.argv[2];

    if (!imagePath) {
        console.error("No image path provided.");
        process.exit(1);
    }

    console.error("1. Starting Edge...");

    const browser = await chromium.launch({
        channel: "msedge",
        headless: false
    });

    const page = await browser.newPage();

    console.error("2. Opening ChatGPT...");

    await page.goto("https://chatgpt.com/", {
        waitUntil: "domcontentloaded"
    });

    await page.waitForTimeout(3000);

    console.error("3. ChatGPT loaded");
    console.error("URL:", page.url());

    // ================================
    // UPLOAD IMAGE
    // ================================
    console.error("4. Looking for file input...");
    
    const fileInput = page.locator('input[type="file"]').first();
    
    await fileInput.waitFor({
        state: "attached",
        timeout: 30000
    });
    
    console.error("5. File input found");
    
    // Make sure the file actually exists
    const fs = require("fs");
    
    if (!fs.existsSync(imagePath)) {
        throw new Error(`Image does not exist: ${imagePath}`);
    }
    
    console.error("6. Image exists:", imagePath);
    
    // Give ChatGPT a moment to finish initializing
    await page.waitForTimeout(2000);
    
    console.error("7. Uploading image...");
    
    await fileInput.setInputFiles({
        name: path.basename(imagePath),
        mimeType: "image/png",
        buffer: fs.readFileSync(imagePath)
    });
    
    console.error("8. File selected in ChatGPT");
    
    // Wait for ChatGPT's upload indicator to disappear
    try {
        await page.locator('[aria-label^="Uploading "]').waitFor({
            state: "detached",
            timeout: 30000
        });
    
        console.error("9. ChatGPT finished uploading image");
    } catch {
        console.error(
            "9. Upload indicator not detected/disappeared; continuing..."
        );
    }
    
    await page.waitForTimeout(1000);
    // ================================
    // MESSAGE BOX
    // ================================

    console.error("8. Looking for message box...");

    const textbox = page.getByRole("textbox", {
        name: "Chat with ChatGPT"
    });

    await textbox.waitFor({
        state: "visible",
        timeout: 30000
    });

    console.error("9. Message box found!");

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

    console.error("10. Prompt entered!");

    // ================================
    // SEND
    // ================================

    const form = page.locator('form[data-has-attachments]');

    await form.waitFor({
        state: "attached",
        timeout: 30000
    });

    console.error("11. Sending prompt...");

    await form.evaluate(form => {
        form.requestSubmit();
    });

    console.error("12. Prompt sent!");

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

    console.error("13. Waiting for response...");

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

    console.error("14. Response received:");
    console.error(responseText);

    // ================================
    // PARSE JSON
    // ================================

    let result;

    try {
        result = JSON.parse(responseText);
    } catch (error) {
        console.error("Failed to parse ChatGPT response as JSON.");
        console.error(responseText);

        await browser.close();
        process.exit(1);
    }

    // ================================
    // SEND ONLY JSON TO SERVER
    // ================================

    process.stdout.write(JSON.stringify(result));

    await browser.close();

})().catch(error => {
    console.error("PLAYWRIGHT FATAL ERROR:");
    console.error(error);

    process.exit(1);
});