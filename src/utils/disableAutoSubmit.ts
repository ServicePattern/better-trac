/**
 * Workaround to block `$("#changelog").empty().append(items.filter("#changelog").contents());`,
 * which Trac runs on every ticket field change to preview the changes to be made.
 */
export function disableAutoSubmit() {
    // @ts-ignore
    const oldEmpty = $.fn.empty;
    // @ts-ignore
    const oldAppend = $.fn.append;

    // @ts-ignore
    $.fn.empty = function () {
        if (this.is("#changelog")) {
            this.data("skip-next-append", true);
            return this;
        }
        // @ts-ignore
        return oldEmpty.apply(this, arguments);
    };

    // @ts-ignore
    $.fn.append = function () {
        if (this.is("#changelog") && this.data("skip-next-append")) {
            this.removeData("skip-next-append");
            return this;
        }
        // @ts-ignore
        return oldAppend.apply(this, arguments);
    };
}
