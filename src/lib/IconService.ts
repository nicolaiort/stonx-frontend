import * as cryptoIcons from 'base64-cryptocurrency-icons';

export class IconService {
    static getTokenIconBase64(token: string): string {
        if (cryptoIcons[token]) {
            return cryptoIcons[token].icon;
        }
        if (token.endsWith('UP')) {
            return this.getTokenIconBase64(token.slice(0, -2));
        }
        if (token.endsWith('DOWN')) {
            return this.getTokenIconBase64(token.slice(0, -4));
        }
        switch (token) {
            case 'IOTA':
                return cryptoIcons['MIOTA']?.icon;
            case 'BEST':
                return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjE4IiBjeT0iMTgiIHI9IjE3IiBmaWxsPSIjRkZGIi8+PHBhdGggZmlsbD0iI0U4MzM1NSIgZD0iTTE4IDM2QzguMDU5IDM2IDAgMjcuOTQxIDAgMThTOC4wNTkgMCAxOCAwczE4IDguMDU5IDE4IDE4LTguMDU5IDE4LTE4IDE4em0yLjExNC04LjgxMWM0LjAzNSAwIDYuNzQ2LTIuNDYxIDYuNzMtNi4wOTggMC0xLjMzMy0uNDItMi41NTUtMS4xNjgtMy40MzNsLjAxNi0uMDE2Yy43NDctLjg3OCAxLjE2OC0yLjEgMS4xNjgtMy40MTcgMC0zLjY1Mi0yLjcxLTYuMTEzLTYuNzQ2LTYuMTEzaC01LjY3MWwtMS4xMjIgNi40MUg5LjIyNGwtLjM5IDIuMThoNC4wOThsLS4zMjcgMS44OTZIOC41MDdsLS4zOSAyLjE4aDQuMDk4bC0xLjEyMiA2LjM5NSA5LjAyMS4wMTZ6bS02LjQzNC0yLjIxbC43NDctNC4yMDJoMi40M2M0LjE0NSAwIDYuMjMzLS4xNzIgNy41ODgtMS4wMDMuMTU2LjM3Ni4yMzQuODMuMjM0IDEuMzAxIDAgMi40MTQtMS43NDUgMy45MTktNC41NjUgMy45MTlsLTYuNDM0LS4wMTZ6bTEuMTIxLTYuMzk2bC4zNDMtMS44ODFoMS43MTRjNC41OTYgMCA1LjgxMS4yODIgNi43NzcuOTQtLjczMi43MjEtMi4zMjEuOTQtNi43NzcuOTRIMTQuOHptLjcxNy00LjA3NmwuNzQ4LTQuMjMyaDMuODQ4YzIuODUxIDAgNC41NjUgMS40NTggNC41NjUgMy45MTkgMCAuNTAxLS4wNzguOTcyLS4yNSAxLjM2My0xLjQ0OC0uODE1LTMuMjcxLTEuMDUtNy41NzEtMS4wNWgtMS4zNHoiLz48L2c+PC9zdmc+';
            default:
                return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI0djI0SDB6Ii8+PHBhdGggZD0iTTEyIDIyQzYuNDc3IDIyIDIgMTcuNTIzIDIgMTJTNi40NzcgMiAxMiAyczEwIDQuNDc3IDEwIDEwLTQuNDc3IDEwLTEwIDEwem0wLTJhOCA4IDAgMSAwIDAtMTYgOCA4IDAgMCAwIDAgMTZ6bS0xLTVoMnYyaC0ydi0yem0yLTEuNjQ1VjE0aC0ydi0xLjVhMSAxIDAgMCAxIDEtMSAxLjUgMS41IDAgMSAwLTEuNDcxLTEuNzk0bC0xLjk2Mi0uMzkzQTMuNTAxIDMuNTAxIDAgMSAxIDEzIDEzLjM1NXoiLz48L3N2Zz4=';
        }
    }
}