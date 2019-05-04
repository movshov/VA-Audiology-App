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
    private tabAvailable: Map<TabsEnum, boolean> = new Map();
    private currentTab: TabsEnum;

    constructor(initialState: StatesEnum, initialTab: TabsEnum) {
        this.changeState(initialState);
        this.selectTab(initialTab);
    }

    public tabIsAvailable(tab: TabsEnum): boolean {
        return this.tabAvailable.get(tab);
    }

    public tabIsSelected(tab: TabsEnum): boolean {
        return tab === this.currentTab;
    }

    public selectTab(tab: TabsEnum) {
        this.currentTab = tab;
    }

    public changeState(state: StatesEnum) {
        this.reset();
        switch (state) {
            case StatesEnum.FROM_QUEST:
                this.tabAvailable.set(TabsEnum.SUMMARY, true);
                this.tabAvailable.set(TabsEnum.TESTS, true);
                this.tabAvailable.set(TabsEnum.NOTES, true);
                this.tabAvailable.set(TabsEnum.SUBMIT_BTN, true);
                this.tabAvailable.set(TabsEnum.DISCARD_BTN, true);
                break;
            case StatesEnum.AUD_NO_DATA:
                this.tabAvailable.set(TabsEnum.SEARCH, true);
                this.tabAvailable.set(TabsEnum.ACCOUNT, true);
                break;
            case StatesEnum.ADMIN_NO_DATA:
                this.tabAvailable.set(TabsEnum.USERS, true);
                this.tabAvailable.set(TabsEnum.QUERIES, true);
                this.tabAvailable.set(TabsEnum.SPREAD, true);
                this.tabAvailable.set(TabsEnum.ACCOUNT, true);
                break;
            case StatesEnum.LOADED_APPT:
                this.tabAvailable.set(TabsEnum.SUMMARY, true);
                this.tabAvailable.set(TabsEnum.NOTES, true);
                this.tabAvailable.set(TabsEnum.SUBMIT_BTN, true);
                this.tabAvailable.set(TabsEnum.CLOSE_BTN, true);
        }
    }

    private reset() {
        for (const tab in Object(TabsEnum)) {
            this.tabAvailable.set(TabsEnum[tab], false);
        }
    }
}
