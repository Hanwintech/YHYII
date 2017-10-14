export class addInsepct {
    recordId = null;
    parentId = null;
    location = null;

    //严重程度
    damamgeDegreeSource: any[];
    //严重程度
    damamgeDegree = null;
    //工种
    workTypeSource: any[];
    //工种
    workType = null;
    //巡检描述
    inspectDescription: string;
    //巡检附件
    picUrl = [];

    //是否修缮
    respair = "0";
    //修缮描述
    respairDescription = null;
    //巡检人员
    inspectPerson = null;
    //巡检时间
    inspectTime = null;
    //巡检人员
    respairPerson = null;
    //巡检时间
    respairTime = null;
}