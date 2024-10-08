export interface Bet {
    id: string;
    db: number;
    operation: number;
    game: string;
    created_date: string;
    status: string;
    wager: number;
    winning: number | null;
    odds: number;
    type: string;
    account: string;
}

export interface BetSelection {
    SelectionId: number;
    SelectionStatus: number;
    Price: string;
    Name: string;
    Spec: string | null;
    MarketTypeId: number;
    MarketId: number;
    MarketName: string;
    IsLive: boolean;
    IsBetBuilder: boolean;
    IsBanker: boolean;
    IsVirtual: boolean;
    BBSelections: any[] | null;
    EventId: number;
    EventCode: string | null;
    FeedEventId: number;
    EventName: string;
    SportTypeId: number;
    CategoryId: number;
    CategoryName: string | null;
    ChampId: number;
    ChampName: string | null;
    EventScore: string | null;
    GameTime: string | null;
    EventDate: string;
    PitcherInfo: any | null;
    Runners: any | null;
    ExtraEventInfo: any | null;
    RC: boolean;
    LiveInfoAtEventMinute: any | null;
    IsLiveOrVirtual: boolean;
    EarlyPayout: boolean;
    BoreDraw: boolean;
    DeadHeatFactor: any | null;
    DbId: number;
}

export interface BetDetail {
    BetNivel: string;
    BetStarts: number;
    BetStatusName: string;
    BetTypeName: string;
    BgSrc: string;
    CashoutOdds: string;
    TotalOdds: string;
    TotalStake: string;
    TotalWin: string;
    CashoutValue: string;
    CreatedDate: string;
    BetSelections: BetSelection[];
    BetStatus: number;
    BetType: number;
    BetId: number;
}
