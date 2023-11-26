
export class ShiftType {
        _id: number | string;
        Name: string;
        PrimaryReq: number;
        SecondaryReq: number;
        CriticalTime: string;
        HoursTaken: string;
        NaughtyList: string;
        IsDefault: boolean;
    
        constructor(
            _id: number | string,
            Name: string,
            PrimaryReq: number,
            SecondaryReq: number,
            CriticalTime: string,
            HoursTaken: string,
            NaughtyList: string,
            IsDefault: boolean
        ) {
            this._id = _id;
            this.Name = Name;
            this.PrimaryReq = PrimaryReq;
            this.SecondaryReq = SecondaryReq;
            this.CriticalTime = CriticalTime;
            this.HoursTaken = HoursTaken;
            this.NaughtyList = NaughtyList;
            this.IsDefault = IsDefault;
        }
    }

  
export class Responder {
    _id: string;
    Username: string;
    Name: string;
    Supervisor: number;
    Training: number;
    Debrief: number;
    Anp: number;
    Regular: number;
    Position: string;
    SFAexpiry: Date;
    BLSexpiry: Date;
    FRexpiry: Date;
    CertExpiration: string;

    constructor(data: any) {
        this._id = data._id;
        this.Username = data.Username;
        this.Name = data.Name;
        this.Supervisor = data.Supervisor
        this.Training = data.Training;
        this.Debrief = data.Debrief;
        this.Anp = data.Anp;
        this.Regular = data.Regular;
        this.Position = data.Position;
        this.SFAexpiry = new Date(data.SFAexpiry);
        this.BLSexpiry = new Date(data.BLSexpiry);
        this.FRexpiry = new Date(data.FRexpiry);
        this.CertExpiration = this.getCertExpiration()
    }
    getCertExpiration(): string {
        const dates: Date[] = [this.SFAexpiry, this.BLSexpiry, this.FRexpiry];
        const earliestDate = dates.reduce((a, b) => a < b ? a : b);
        const today = new Date();
        const timeDiff = Math.abs(earliestDate.getTime() - today.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return `${diffDays} days`;
    }
}