export type Language = "en" | "zh";

export interface Translations {
    placeholder: string;
    emptyStateTitle: string;
    emptyStateSubtitle: string;
    filterAll: string;
    filterActive: string;
    filterCompleted: string;
    itemsLeft: string;
    clearCompleted: string;
    credits: string;
    created: string;
    done: string;
    took: string;
    reminderSet: string;
    reminderDue: string;
    clearReminder: string;
}

const translations: Record<Language, Translations> = {
    en: {
        placeholder: "What needs to be done?",
        emptyStateTitle: "All caught up!",
        emptyStateSubtitle: "Enjoy your day.",
        filterAll: "All",
        filterActive: "Active",
        filterCompleted: "Completed",
        itemsLeft: "left",
        clearCompleted: "Clear completed",
        credits: "Crafted by Mia & Serge",
        created: "Created",
        done: "Done",
        took: "Took",
        reminderSet: "Reminder set",
        reminderDue: "Reminder!",
        clearReminder: "Clear reminder",
    },
    zh: {
        placeholder: "需要做什么？",
        emptyStateTitle: "任务已清空！",
        emptyStateSubtitle: "享受生活吧。",
        filterAll: "全部",
        filterActive: "未完成",
        filterCompleted: "已完成",
        itemsLeft: "项待处理",
        clearCompleted: "清除已完成",
        credits: "来自 小敏 & 小志 的设计",
        created: "创建于",
        done: "完成于",
        took: "用时",
        reminderSet: "已设提醒",
        reminderDue: "提醒！",
        clearReminder: "清除提醒",
    },
};

export function getTranslations(lang: Language): Translations {
    return translations[lang];
}
