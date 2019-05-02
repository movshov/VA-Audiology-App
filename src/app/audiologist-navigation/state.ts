export enum TabsEnum {
    SUMMARY,
    TESTS,
    NOTES,
    SEARCH,
    ACCOUNT,
    USERS,
    QUERIES,
    SPREAD,
    SUBMIT_BTN,
    DISCARD_BTN,
    CLOSE_BTN
};
export enum StatesEnum {
    FROM_QUEST,
    AUD_NO_DATA,
    ADMIN_NO_DATA,
    LOADED_APPT
}

export class State {
    private tabVisibility: Map<TabsEnum, boolean> = new Map();

    constructor(state: StatesEnum) {
        this.changeState(state);
    }

    public tabIsVisible(tab: TabsEnum): boolean {
        return this.tabVisibility.get(tab);
    }

    public changeState(state: StatesEnum) {
        this.reset();
        switch (state) {
            case StatesEnum.FROM_QUEST:
                this.tabVisibility.set(TabsEnum.SUMMARY, true);
                this.tabVisibility.set(TabsEnum.TESTS, true);
                this.tabVisibility.set(TabsEnum.NOTES, true);
                this.tabVisibility.set(TabsEnum.SUBMIT_BTN, true);
                this.tabVisibility.set(TabsEnum.DISCARD_BTN, true);
                break;
            case StatesEnum.AUD_NO_DATA:
                this.tabVisibility.set(TabsEnum.SEARCH, true);
                this.tabVisibility.set(TabsEnum.ACCOUNT, true);
                break;
            case StatesEnum.ADMIN_NO_DATA:
                this.tabVisibility.set(TabsEnum.USERS, true);
                this.tabVisibility.set(TabsEnum.QUERIES, true);
                this.tabVisibility.set(TabsEnum.SPREAD, true);
                this.tabVisibility.set(TabsEnum.ACCOUNT, true);
                break;
            case StatesEnum.LOADED_APPT:
                this.tabVisibility.set(TabsEnum.SUMMARY, true);
                this.tabVisibility.set(TabsEnum.NOTES, true);
                this.tabVisibility.set(TabsEnum.SUBMIT_BTN, true);
                this.tabVisibility.set(TabsEnum.CLOSE_BTN, true);
        }
    }

    private reset() {
        for (const tab in Object(TabsEnum)) {
            this.tabVisibility.set(TabsEnum[tab], false);
        }
    }
}
