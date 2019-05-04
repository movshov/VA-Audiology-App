import { Utilities } from '../common/utlilities';

/*
    If you need to add a new option to the audiologist and/or admin:
    1. Add a new item in TabsEnum
    2. Add to setupState() under the appropriate state(s) it should appear
*/
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

    constructor() {
        this.determineState();
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

    public determineState() {
        if(Utilities.getSessionStorage('dataFromDB') === 'true') {
            this.setupState(StatesEnum.LOADED_APPT);
        } else if(Utilities.getSessionStorage('dataFromDB') === 'false') {
            this.setupState(StatesEnum.FROM_QUEST);
        } else {
            if(Utilities.getSessionStorage('permissions') === 'audiologist') {
                this.setupState(StatesEnum.AUD_NO_DATA);
            } else if(Utilities.getSessionStorage('permissions') === 'admin'){
                this.setupState(StatesEnum.ADMIN_NO_DATA);
            }
        }
    }

    private setupState(state: StatesEnum) {
        this.reset();
        switch (state) {
            case StatesEnum.FROM_QUEST:
                this.tabAvailable.set(TabsEnum.SUMMARY, true);
                this.tabAvailable.set(TabsEnum.TESTS, true);
                this.tabAvailable.set(TabsEnum.NOTES, true);
                this.tabAvailable.set(TabsEnum.SUBMIT_BTN, true);
                this.tabAvailable.set(TabsEnum.DISCARD_BTN, true);
                this.selectTab(TabsEnum.SUMMARY);
                break;
            case StatesEnum.AUD_NO_DATA:
                this.tabAvailable.set(TabsEnum.SEARCH, true);
                this.tabAvailable.set(TabsEnum.ACCOUNT, true);
                this.selectTab(TabsEnum.SEARCH);
                break;
            case StatesEnum.ADMIN_NO_DATA:
                this.tabAvailable.set(TabsEnum.USERS, true);
                this.tabAvailable.set(TabsEnum.QUERIES, true);
                this.tabAvailable.set(TabsEnum.SPREAD, true);
                this.tabAvailable.set(TabsEnum.ACCOUNT, true);
                this.selectTab(TabsEnum.USERS);
                break;
            case StatesEnum.LOADED_APPT:
                this.tabAvailable.set(TabsEnum.SUMMARY, true);
                this.tabAvailable.set(TabsEnum.NOTES, true);
                this.tabAvailable.set(TabsEnum.SUBMIT_BTN, true);
                this.tabAvailable.set(TabsEnum.CLOSE_BTN, true);
                this.selectTab(TabsEnum.SUMMARY);
        }
    }

    private reset() {
        for (const tab in Object(TabsEnum)) {
            this.tabAvailable.set(TabsEnum[tab], false);
        }
    }
}
