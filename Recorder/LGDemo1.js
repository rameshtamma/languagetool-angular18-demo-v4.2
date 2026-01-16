import url from 'url';
import { createRunner } from '@puppeteer/replay';

export async function run(extension) {
    const runner = await createRunner(extension);

    await runner.runBeforeAllSteps();

    await runner.runStep({
        type: 'setViewport',
        width: 1987,
        height: 994,
        deviceScaleFactor: 1,
        isMobile: false,
        hasTouch: false,
        isLandscape: false
    });
    await runner.runStep({
        type: 'navigate',
        url: 'http://localhost:4200/',
        assertedEvents: [
            {
                type: 'navigation',
                url: 'http://localhost:4200/',
                title: 'LanguageTool Angular Demo'
            }
        ]
    });
    await runner.runStep({
        type: 'click',
        target: 'main',
        selectors: [
            [
                'aria/Check Grammar'
            ],
            [
                'button:nth-of-type(1)'
            ],
            [
                'xpath//html/body/app-root/div/section[1]/div[1]/button[1]'
            ],
            [
                'pierce/button:nth-of-type(1)'
            ]
        ],
        offsetY: 24,
        offsetX: 53.5999755859375,
    });
    await runner.runStep({
        type: 'click',
        target: 'main',
        selectors: [
            [
                'aria/Type here…'
            ],
            [
                'textarea'
            ],
            [
                'xpath//html/body/app-root/div/section[1]/div[2]/textarea'
            ],
            [
                'pierce/textarea'
            ]
        ],
        offsetY: 19.599990844726562,
        offsetX: 15.79998779296875,
    });
    await runner.runStep({
        type: 'click',
        target: 'main',
        selectors: [
            [
                'aria/I'
            ],
            [
                'div.editor-wrap button'
            ],
            [
                'xpath//html/body/app-root/div/section[1]/div[2]/div[2]/button'
            ],
            [
                'pierce/div.editor-wrap button'
            ]
        ],
        offsetY: 10.899993896484375,
        offsetX: 19,
    });
    await runner.runStep({
        type: 'click',
        target: 'main',
        selectors: [
            [
                'aria/Type here…'
            ],
            [
                'textarea'
            ],
            [
                'xpath//html/body/app-root/div/section[1]/div[2]/textarea'
            ],
            [
                'pierce/textarea'
            ],
            [
                'text/i not awar of'
            ]
        ],
        offsetY: 25.599990844726562,
        offsetX: 64.79998779296875,
    });
    await runner.runStep({
        type: 'keyDown',
        target: 'main',
        key: 'Escape'
    });
    await runner.runStep({
        type: 'keyUp',
        key: 'Escape',
        target: 'main'
    });
    await runner.runStep({
        type: 'click',
        target: 'main',
        selectors: [
            [
                'aria/Type here…'
            ],
            [
                'textarea'
            ],
            [
                'xpath//html/body/app-root/div/section[1]/div[2]/textarea'
            ],
            [
                'pierce/textarea'
            ],
            [
                'text/i not awar of'
            ]
        ],
        offsetY: 0.5999908447265625,
        offsetX: 354.79998779296875,
    });
    await runner.runStep({
        type: 'keyDown',
        target: 'main',
        key: 'Escape'
    });
    await runner.runStep({
        type: 'keyUp',
        key: 'Escape',
        target: 'main'
    });
    await runner.runStep({
        type: 'click',
        target: 'main',
        selectors: [
            [
                'aria/Type here…'
            ],
            [
                'textarea'
            ],
            [
                'xpath//html/body/app-root/div/section[1]/div[2]/textarea'
            ],
            [
                'pierce/textarea'
            ],
            [
                'text/i not awar of'
            ]
        ],
        offsetY: 21.599990844726562,
        offsetX: 19.79998779296875,
    });
    await runner.runStep({
        type: 'keyDown',
        target: 'main',
        key: 'Tab'
    });
    await runner.runStep({
        type: 'keyUp',
        key: 'Tab',
        target: 'main'
    });
    await runner.runStep({
        type: 'click',
        target: 'main',
        selectors: [
            [
                'aria/aware',
                'aria/[role="generic"]'
            ],
            [
                'button:nth-of-type(4) > span'
            ],
            [
                'xpath//html/body/app-root/div/section[1]/div[2]/div[2]/button[4]/span'
            ],
            [
                'pierce/button:nth-of-type(4) > span'
            ]
        ],
        offsetY: 8.29998779296875,
        offsetX: 32.7249755859375,
    });
    await runner.runStep({
        type: 'click',
        target: 'main',
        selectors: [
            [
                'aria/Type here…'
            ],
            [
                'textarea'
            ],
            [
                'xpath//html/body/app-root/div/section[1]/div[2]/textarea'
            ],
            [
                'pierce/textarea'
            ],
            [
                'text/i not awar of'
            ]
        ],
        offsetY: 17.599990844726562,
        offsetX: 137.79998779296875,
    });
    await runner.runStep({
        type: 'keyDown',
        target: 'main',
        key: 'Tab'
    });
    await runner.runStep({
        type: 'keyUp',
        key: 'Tab',
        target: 'main'
    });
    await runner.runStep({
        type: 'click',
        target: 'main',
        selectors: [
            [
                'aria/Want'
            ],
            [
                'button:nth-of-type(3)'
            ],
            [
                'xpath//html/body/app-root/div/section[1]/div[2]/div[2]/button[3]'
            ],
            [
                'pierce/button:nth-of-type(3)'
            ]
        ],
        offsetY: 12.699981689453125,
        offsetX: 46.29998779296875,
    });
    await runner.runStep({
        type: 'click',
        target: 'main',
        selectors: [
            [
                'aria/Type here…'
            ],
            [
                'textarea'
            ],
            [
                'xpath//html/body/app-root/div/section[1]/div[2]/textarea'
            ],
            [
                'pierce/textarea'
            ],
            [
                'text/i not awar of'
            ]
        ],
        offsetY: 29.599990844726562,
        offsetX: 222.79998779296875,
    });
    await runner.runStep({
        type: 'keyDown',
        target: 'main',
        key: 'Tab'
    });
    await runner.runStep({
        type: 'keyUp',
        key: 'Tab',
        target: 'main'
    });
    await runner.runStep({
        type: 'click',
        target: 'main',
        selectors: [
            [
                'aria/get',
                'aria/[role="generic"]'
            ],
            [
                'button:nth-of-type(4) > span'
            ],
            [
                'xpath//html/body/app-root/div/section[1]/div[2]/div[2]/button[4]/span'
            ],
            [
                'pierce/button:nth-of-type(4) > span'
            ]
        ],
        offsetY: 8.29998779296875,
        offsetX: 18.5374755859375,
    });
    await runner.runStep({
        type: 'click',
        target: 'main',
        selectors: [
            [
                'aria/Type here…'
            ],
            [
                'textarea'
            ],
            [
                'xpath//html/body/app-root/div/section[1]/div[2]/textarea'
            ],
            [
                'pierce/textarea'
            ],
            [
                'text/i not awar of'
            ]
        ],
        offsetY: 26.599990844726562,
        offsetX: 240.79998779296875,
    });
    await runner.runStep({
        type: 'keyDown',
        target: 'main',
        key: 'Tab'
    });
    await runner.runStep({
        type: 'keyUp',
        key: 'Tab',
        target: 'main'
    });
    await runner.runStep({
        type: 'click',
        target: 'main',
        selectors: [
            [
                'aria/more'
            ],
            [
                'button:nth-of-type(4)'
            ],
            [
                'xpath//html/body/app-root/div/section[1]/div[2]/div[2]/button[4]'
            ],
            [
                'pierce/button:nth-of-type(4)'
            ]
        ],
        offsetY: 12.100006103515625,
        offsetX: 43.3499755859375,
    });
    await runner.runStep({
        type: 'click',
        target: 'main',
        selectors: [
            [
                'aria/Type here…'
            ],
            [
                'textarea'
            ],
            [
                'xpath//html/body/app-root/div/section[1]/div[2]/textarea'
            ],
            [
                'pierce/textarea'
            ],
            [
                'text/i not awar of'
            ]
        ],
        offsetY: 22.599990844726562,
        offsetX: 26.79998779296875,
    });
    await runner.runStep({
        type: 'click',
        target: 'main',
        selectors: [
            [
                'aria/I am not',
                'aria/[role="generic"]'
            ],
            [
                'div.dropdown span'
            ],
            [
                'xpath//html/body/app-root/div/section[1]/div[2]/div[2]/button/span'
            ],
            [
                'pierce/div.dropdown span'
            ]
        ],
        offsetY: 1.0999908447265625,
        offsetX: 12.70001220703125,
    });

    await runner.runAfterAllSteps();
}

if (process && import.meta.url === url.pathToFileURL(process.argv[1]).href) {
    run()
}
