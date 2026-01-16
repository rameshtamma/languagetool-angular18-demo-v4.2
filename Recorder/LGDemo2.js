const fs = require('fs');
const puppeteer = require('puppeteer'); // v23.0.0 or later

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    const lhApi = await import('lighthouse'); // v10.0.0 or later
    const flags = {
        screenEmulation: {
            disabled: true
        }
    }
    const config = lhApi.desktopConfig;
    const lhFlow = await lhApi.startFlow(page, {name: 'LGDemo1', config, flags});
    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 1987,
            height: 994
        })
    }
    await lhFlow.startNavigation();
    {
        const targetPage = page;
        await targetPage.goto('http://localhost:4200/');
    }
    await lhFlow.endNavigation();
    await lhFlow.startTimespan();
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Check Grammar)'),
            targetPage.locator('button:nth-of-type(1)'),
            targetPage.locator('::-p-xpath(/html/body/app-root/div/section[1]/div[1]/button[1])'),
            targetPage.locator(':scope >>> button:nth-of-type(1)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 53.5999755859375,
                y: 24,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Type here…)'),
            targetPage.locator('textarea'),
            targetPage.locator('::-p-xpath(/html/body/app-root/div/section[1]/div[2]/textarea)'),
            targetPage.locator(':scope >>> textarea')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 15.79998779296875,
                y: 19.599990844726562,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(I)'),
            targetPage.locator('div.editor-wrap button'),
            targetPage.locator('::-p-xpath(/html/body/app-root/div/section[1]/div[2]/div[2]/button)'),
            targetPage.locator(':scope >>> div.editor-wrap button')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 19,
                y: 10.899993896484375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Type here…)'),
            targetPage.locator('textarea'),
            targetPage.locator('::-p-xpath(/html/body/app-root/div/section[1]/div[2]/textarea)'),
            targetPage.locator(':scope >>> textarea'),
            targetPage.locator('::-p-text(i not awar of)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 64.79998779296875,
                y: 25.599990844726562,
              },
            });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Escape');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Escape');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Type here…)'),
            targetPage.locator('textarea'),
            targetPage.locator('::-p-xpath(/html/body/app-root/div/section[1]/div[2]/textarea)'),
            targetPage.locator(':scope >>> textarea'),
            targetPage.locator('::-p-text(i not awar of)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 354.79998779296875,
                y: 0.5999908447265625,
              },
            });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Escape');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Escape');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Type here…)'),
            targetPage.locator('textarea'),
            targetPage.locator('::-p-xpath(/html/body/app-root/div/section[1]/div[2]/textarea)'),
            targetPage.locator(':scope >>> textarea'),
            targetPage.locator('::-p-text(i not awar of)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 19.79998779296875,
                y: 21.599990844726562,
              },
            });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Tab');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Tab');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(aware) >>>> ::-p-aria([role=\\"generic\\"])'),
            targetPage.locator('button:nth-of-type(4) > span'),
            targetPage.locator('::-p-xpath(/html/body/app-root/div/section[1]/div[2]/div[2]/button[4]/span)'),
            targetPage.locator(':scope >>> button:nth-of-type(4) > span')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 32.7249755859375,
                y: 8.29998779296875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Type here…)'),
            targetPage.locator('textarea'),
            targetPage.locator('::-p-xpath(/html/body/app-root/div/section[1]/div[2]/textarea)'),
            targetPage.locator(':scope >>> textarea'),
            targetPage.locator('::-p-text(i not awar of)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 137.79998779296875,
                y: 17.599990844726562,
              },
            });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Tab');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Tab');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Want)'),
            targetPage.locator('button:nth-of-type(3)'),
            targetPage.locator('::-p-xpath(/html/body/app-root/div/section[1]/div[2]/div[2]/button[3])'),
            targetPage.locator(':scope >>> button:nth-of-type(3)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 46.29998779296875,
                y: 12.699981689453125,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Type here…)'),
            targetPage.locator('textarea'),
            targetPage.locator('::-p-xpath(/html/body/app-root/div/section[1]/div[2]/textarea)'),
            targetPage.locator(':scope >>> textarea'),
            targetPage.locator('::-p-text(i not awar of)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 222.79998779296875,
                y: 29.599990844726562,
              },
            });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Tab');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Tab');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(get) >>>> ::-p-aria([role=\\"generic\\"])'),
            targetPage.locator('button:nth-of-type(4) > span'),
            targetPage.locator('::-p-xpath(/html/body/app-root/div/section[1]/div[2]/div[2]/button[4]/span)'),
            targetPage.locator(':scope >>> button:nth-of-type(4) > span')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 18.5374755859375,
                y: 8.29998779296875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Type here…)'),
            targetPage.locator('textarea'),
            targetPage.locator('::-p-xpath(/html/body/app-root/div/section[1]/div[2]/textarea)'),
            targetPage.locator(':scope >>> textarea'),
            targetPage.locator('::-p-text(i not awar of)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 240.79998779296875,
                y: 26.599990844726562,
              },
            });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Tab');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Tab');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(more)'),
            targetPage.locator('button:nth-of-type(4)'),
            targetPage.locator('::-p-xpath(/html/body/app-root/div/section[1]/div[2]/div[2]/button[4])'),
            targetPage.locator(':scope >>> button:nth-of-type(4)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 43.3499755859375,
                y: 12.100006103515625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Type here…)'),
            targetPage.locator('textarea'),
            targetPage.locator('::-p-xpath(/html/body/app-root/div/section[1]/div[2]/textarea)'),
            targetPage.locator(':scope >>> textarea'),
            targetPage.locator('::-p-text(i not awar of)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 26.79998779296875,
                y: 22.599990844726562,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(I am not) >>>> ::-p-aria([role=\\"generic\\"])'),
            targetPage.locator('div.dropdown span'),
            targetPage.locator('::-p-xpath(/html/body/app-root/div/section[1]/div[2]/div[2]/button/span)'),
            targetPage.locator(':scope >>> div.dropdown span')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 12.70001220703125,
                y: 1.0999908447265625,
              },
            });
    }
    await lhFlow.endTimespan();
    const lhFlowReport = await lhFlow.generateReport();
    fs.writeFileSync(__dirname + '/flow.report.html', lhFlowReport)

    await browser.close();

})().catch(err => {
    console.error(err);
    process.exit(1);
});
