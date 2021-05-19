import * as cryptoIcons from 'base64-cryptocurrency-icons';

export class IconService {

    static fallbackIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI0djI0SDB6Ii8+PHBhdGggZD0iTTEyIDIyQzYuNDc3IDIyIDIgMTcuNTIzIDIgMTJTNi40NzcgMiAxMiAyczEwIDQuNDc3IDEwIDEwLTQuNDc3IDEwLTEwIDEwem0wLTJhOCA4IDAgMSAwIDAtMTYgOCA4IDAgMCAwIDAgMTZ6bS0xLTVoMnYyaC0ydi0yem0yLTEuNjQ1VjE0aC0ydi0xLjVhMSAxIDAgMCAxIDEtMSAxLjUgMS41IDAgMSAwLTEuNDcxLTEuNzk0bC0xLjk2Mi0uMzkzQTMuNTAxIDMuNTAxIDAgMSAxIDEzIDEzLjM1NXoiLz48L3N2Zz4='

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
            case 'BETH':
                return this.getExchangeIconBase64('BINANCE')
            default:
                return this.fallbackIcon;
        }
    }

    static getIndexIconBase64(index: string): string {
        switch (index) {
            case 'BCI5':
                return 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDM2IDM2Ij48c3R5bGU+PC9zdHlsZT48ZyBpZD0iaWNvbnNfeDJGX2Fzc2V0c194MkZfYXNzZXQtYmNpNSI+PHBhdGggaWQ9IlNoYXBlIiBkPSJNNS4xIDE5LjljLS4xLS41LS4xLTEtLjEtMS41bC4xIDEuNXpNMTggMGM5LjkgMCAxOCA4LjEgMTggMThzLTguMSAxOC0xOCAxOFMwIDI3LjkgMCAxOCA4LjEgMCAxOCAwem0uMiAxOC4xVjMxYy41IDAgMS0uMSAxLjUtLjEgMy44LS41IDcuMS0yLjYgOS4xLTUuNy4zLS40LjUtLjkuOC0xLjNsLTExLjQtNS44em0tMS4xLjNMNS4zIDIxLjFjLjEuNS4zIDEgLjUgMS41IDEuNiA0LjIgNS4zIDcuNCA5LjggOC4yLjUuMSAxIC4yIDEuNS4yVjE4LjR6bTIuNiAyLjJsNy44IDMuOWMtLjQuNi0uOCAxLjEtMS4zIDEuNi0xLjggMS44LTQgMi45LTYuNSAzLjN2LTguOHptLTQuMS0uM3Y5Yy0yLjEtLjUtNC4xLTEuNS01LjctMy4xLTEuMS0xLjEtMi0yLjUtMi42LTMuOWw4LjMtMnpNMjcuNCA5bC04LjMgOC4zIDExIDUuNWMuMi0uNS4zLTEgLjUtMS41LjMtMS4xLjUtMi4zLjUtMy40IDAtMi45LTEtNS42LTIuNi03LjhMMjcuNCA5em0tLjEgMi4yYzEuNCAxLjkgMi4yIDQuMyAyLjIgNi43IDAgLjktLjEgMS44LS4zIDIuN2wtNy41LTMuOCA1LjYtNS42ek0xNyA1Yy0uNSAwLTEgLjEtMS41LjJDOS41IDYuNCA0LjkgMTEuNyA0LjkgMTh2LjNjMCAuNS4xIDEgLjEgMS41bDEyLTIuN1Y1em0tMS41IDEuN3Y5LjJsLTkgMmMwLTUuNCAzLjktMTAgOS0xMS4yem0yLjYtMS44djExLjdsOC40LTguNWMtLjQtLjMtLjgtLjctMS4yLTEtMS43LTEuMS0zLjYtMS45LTUuNy0yLjItLjQuMS0uOSAwLTEuNSAwem0xLjYgMS43YzEuNi4yIDMuMi44IDQuNiAxLjdMMTkuNyAxM1Y2LjZ6bS0xMy45IDE2Yy0uMi0uNS0uMy0xLS41LTEuNWwuNSAxLjV6IiBmaWxsPSIjMWI3Njk4Ii8+PC9nPjwvc3ZnPg==';
            case 'BCI10':
                return 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyJ2aWV3Qm94PSIwIDAgMzYgMzYiPjxzdHlsZT48L3N0eWxlPjxnIGlkPSJpY29uc194MkZfYXNzZXRzX3gyRl9hc3NldC1iY2kxMCI+PGcgaWQ9ImluZGV4Ij48cGF0aCBpZD0iU2hhcGVfMV8iIGQ9Ik01LjIgMTkuOGMtLjEtLjUtLjEtMS0uMS0xLjVsLjEgMS41ek0xOC4xLS4xYzkuOSAwIDE4IDguMSAxOCAxOHMtOC4xIDE4LTE4IDE4LTE4LTguMS0xOC0xOCA4LjEtMTggMTgtMTh6bS4yIDE4LjJWMzFjLjUgMCAxLS4xIDEuNS0uMSAzLjgtLjUgNy4xLTIuNiA5LjEtNS43LjMtLjQuNS0uOS44LTEuM2wtMTEuNC01Ljh6bS0xLjEuMkw1LjUgMjEuMWMuMS41LjMgMSAuNSAxLjUgMS42IDQuMiA1LjMgNy40IDkuOCA4LjIuNS4xIDEgLjIgMS41LjJ2LTEuNWwtLjEtMTEuMnptMi43IDIuM2w3LjggMy45Yy0uNC42LS44IDEuMS0xLjMgMS42LTEuOCAxLjgtNCAyLjktNi41IDMuM3YtOC44em0tNC4yLS40djljLTIuMS0uNS00LjEtMS41LTUuNy0zLjEtMS4xLTEuMS0yLTIuNS0yLjYtMy45bDguMy0yek0yNy42IDguOWwtOC4zIDguMyAxMSA1LjVjLjItLjUuMy0xIC41LTEuNS4zLTEuMS41LTIuMy41LTMuNCAwLTIuOS0xLTUuNi0yLjYtNy44LS41LS4zLS44LS43LTEuMS0xLjF6bS0uMSAyLjNjMS40IDEuOSAyLjIgNC4zIDIuMiA2LjcgMCAuOS0uMSAxLjgtLjMgMi43bC03LjUtMy44IDUuNi01LjZ6TTE3LjIgNC45Yy0uNSAwLTEgLjEtMS41LjJDOS42IDYuMyA1IDExLjYgNS4xIDE4di4zYzAgLjUuMSAxIC4xIDEuNWwxMi0yLjdWNC45em0tMS41IDEuOHY5LjJsLTkgMmMtLjEtNS41IDMuOC0xMC4xIDktMTEuMnptMi42LTEuOHYxMS43bDguNC04LjVjLS40LS4zLS44LS43LTEuMi0xQzIzLjggNiAyMS45IDUuMyAxOS44IDVjLS41LS4xLTEtLjEtMS41LS4xem0xLjUgMS43YzEuNi4yIDMuMi44IDQuNiAxLjdsLTQuNiA0LjZWNi42ek01LjkgMjIuNWMtLjItLjUtLjMtMS0uNS0xLjVsLjUgMS41eiIgZmlsbD0iIzI0NDU4YSIvPjwvZz48L2c+PC9zdmc+';
            case 'BCI25':
                return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNiAzNiI+PHN0eWxlPjwvc3R5bGU+PHBhdGggaWQ9IlNoYXBlIiBkPSJNNS4yIDE5LjhjLS4xLS41LS4xLTEtLjEtMS41bC4xIDEuNXpNMTguMS0uMWM5LjkgMCAxOCA4LjEgMTggMThzLTguMSAxOC0xOCAxOC0xOC04LjEtMTgtMTggOC4xLTE4IDE4LTE4em0uMiAxOC4yVjMxYy41IDAgMS0uMSAxLjUtLjEgMy44LS41IDcuMS0yLjYgOS4xLTUuNy4zLS40LjUtLjkuOC0xLjNsLTExLjQtNS44em0tMS4xLjJMNS41IDIxLjFjLjEuNS4zIDEgLjUgMS41IDEuNiA0LjIgNS4zIDcuNCA5LjggOC4yLjUuMSAxIC4yIDEuNS4ydi0xLjVsLS4xLTExLjJ6bTIuNyAyLjNsNy44IDMuOWMtLjQuNi0uOCAxLjEtMS4zIDEuNi0xLjggMS44LTQgMi45LTYuNSAzLjN2LTguOHptLTQuMi0uNHY5Yy0yLjEtLjUtNC4xLTEuNS01LjctMy4xLTEuMS0xLjEtMi0yLjUtMi42LTMuOWw4LjMtMnpNMjcuNiA4LjlsLTguMyA4LjMgMTEgNS41Yy4yLS41LjMtMSAuNS0xLjUuMy0xLjEuNS0yLjMuNS0zLjQgMC0yLjktMS01LjYtMi42LTcuOC0uNS0uMy0uOC0uNy0xLjEtMS4xem0tLjEgMi4zYzEuNCAxLjkgMi4yIDQuMyAyLjIgNi43IDAgLjktLjEgMS44LS4zIDIuN2wtNy41LTMuOCA1LjYtNS42ek0xNy4yIDQuOWMtLjUgMC0xIC4xLTEuNS4yQzkuNiA2LjMgNSAxMS42IDUuMSAxOHYuM2MwIC41LjEgMSAuMSAxLjVsMTItMi43VjQuOXptLTEuNSAxLjh2OS4ybC05IDJjLS4xLTUuNSAzLjgtMTAuMSA5LTExLjJ6bTIuNi0xLjh2MTEuN2w4LjQtOC41Yy0uNC0uMy0uOC0uNy0xLjItMUMyMy44IDYgMjEuOSA1LjMgMTkuOCA1Yy0uNS0uMS0xLS4xLTEuNS0uMXptMS41IDEuN2MxLjYuMiAzLjIuOCA0LjYgMS43bC00LjYgNC42VjYuNnpNNS45IDIyLjVjLS4yLS41LS4zLTEtLjUtMS41bC41IDEuNXoiIGZpbGw9IiMwOTY3YWEiLz48L3N2Zz4=';
            default:
                return this.fallbackIcon;
        }
    }

    static getExchangeIconBase64(exchange: string): string {
        switch (exchange) {
            case "BINANCE":
                return "data:image/svg+xml;base64,PHN2Zw0KCQkJeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIg0KCQkJdmlld0JveD0iMCAwIDI1MDAgMjUwMCINCgkJPg0KCQkJPHBhdGgNCgkJCQljbGFzcz0iY2xzLTEiDQogICAgICAgICAgICAgICAgZmlsbD0iI0YzQkEyRiINCgkJCQlkPSJNNzY0LjQ4IDEwNTAuNTJMMTI1MCA1NjVsNDg1Ljc1IDQ4NS43MyAyODIuNS0yODIuNUwxMjUwIDAgNDgyIDc2OGwyODIuNDkgMjgyLjVNMCAxMjUwbDI4Mi41MS0yODIuNTVMNTY1IDEyNDkuOTRsLTI4Mi41MSAyODIuNTF6bTc2NC40OCAxOTkuNTFMMTI1MCAxOTM1bDQ4NS43NC00ODUuNzIgMjgyLjY1IDI4Mi4zNS0uMTQuMTVMMTI1MCAyNTAwbC03NjgtNzY4LS40LS40IDI4Mi45MS0yODIuMTJNMTkzNSAxMjUwLjEybDI4Mi41MS0yODIuNTFMMjUwMCAxMjUwLjFsLTI4Mi41IDI4Mi41MXoiDQoJCQkvPjxwYXRoDQoJCQkJY2xhc3M9ImNscy0xIg0KICAgICAgICAgICAgICAgIGZpbGw9IiNGM0JBMkYiDQoJCQkJZD0iTTE1MzYuNTIgMTI0OS44NWguMTJMMTI1MCA5NjMuMTkgMTAzOC4xMyAxMTc1bC0yNC4zNCAyNC4zNS01MC4yIDUwLjIxLS40LjM5LjQuNDFMMTI1MCAxNTM2LjgxbDI4Ni42Ni0yODYuNjYuMTQtLjE2LS4yNi0uMTQiDQoJCQkvPjwvc3ZnDQoJCT4=";
            default:
                return this.fallbackIcon;
        }
    }
}