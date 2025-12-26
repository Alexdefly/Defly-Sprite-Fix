// disable-seasonal.js
(() => {
    const script = document.createElement('script');
    script.textContent = `
        const RealDate = Date;
        class FakeDate extends RealDate {
            constructor(...args) { super(...args); }
            getMonth() { return 6; } // July
        }
        window.Date = FakeDate;
    `;
    document.documentElement.appendChild(script);
    script.remove();
})();
