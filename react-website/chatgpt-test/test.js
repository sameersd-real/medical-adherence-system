const { chromium } = require("playwright");
const path = require("path");

(async () => {
    console.log("1. Starting Edge...");

    const browser = await chromium.launch({
        headless: false,
        channel: "msedge"
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    console.log("2. Opening ChatGPT...");

    await page.goto("https://chatgpt.com/", {
        waitUntil: "domcontentloaded"
    });

    console.log("3. ChatGPT loaded");
    console.log("URL:", page.url());

    // Give ChatGPT time to load
    await page.waitForTimeout(3000);

    console.log("4. Looking for file input...");

    const fileInput = page.locator('input[type="file"]').first();

    await fileInput.waitFor({
        state: "attached",
        timeout: 15000
    });

    console.log("5. File input found");

    const imagePath = path.join(__dirname, "prescription.png");

    console.log("6. Uploading:", imagePath);

    await fileInput.setInputFiles(imagePath);

    console.log("7. IMAGE UPLOADED");

    const prompt = `
Analyze the prescription image.

Extract every medicine you can identify.

For each medicine, give:
- medicine name
- strength/dosage
- quantity
- frequency
- timing
- instructions

Return ONLY valid JSON:

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

If something cannot be determined from the image, use an empty string.
Do not guess.
Only return information that is actually visible in the image.
`;

   console.log("8. Looking for message box...");

    const textbox = page.getByRole("textbox", {
        name: "Chat with ChatGPT"
    });

    await textbox.waitFor({
        state: "visible",
        timeout: 15000
    });

    console.log("9. Message box found!");

    await textbox.fill(prompt);

    console.log("10. Prompt entered!");

    const form = page.locator('form[data-has-attachments]');

    await form.evaluate(form => {
        form.requestSubmit();
    });

    console.log("11. Prompt automatically submitted!");

    console.log("12. Waiting for ChatGPT response...");
    
    const response = page.locator(
        '[data-assistant-markdown]'
    ).last();
    
    await response.waitFor({
        state: "visible",
        timeout: 60000
    });
    
    console.log("13. Response started streaming...");
    
    let previousText = "";
    let stableCount = 0;
    
    while (stableCount < 3) {
    
        const currentText = await response.innerText();
    
        console.log("Current response length:", currentText.length);
    
        if (currentText === previousText) {
            stableCount++;
        } else {
            stableCount = 0;
            previousText = currentText;
        }
    
        await page.waitForTimeout(1000);
    }
    
    const responseText = previousText.trim();
    
    console.log("14. Response finished!");
    
    console.log("\n========== CHATGPT RESPONSE ==========");
    console.log(responseText);
    console.log("======================================");
    
    let result;
    
    try {
    
        result = JSON.parse(responseText);
    
        console.log("15. Valid JSON received!");
    
        console.log(
            JSON.stringify(result, null, 2)
        );
    
    } catch (error) {
    
        console.log("❌ Invalid JSON");
    
        console.log(
            "Raw response:",
            responseText
        );
    }

    await page.pause();

    await browser.close();
})();