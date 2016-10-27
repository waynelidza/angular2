export interface StdProvForm {
    ProjectName:string;
    ProvisioningName:string;
    OS:OS;
    Size:Size;
    RootVolumeSize:number;
    AdditionalDisks :AdditionalDisk[];
    Subnet:Subnet;
}

export class AdditionalDisk  {
    size:number;
}

export class OS {

    public ID:string;
    public Description:string;
    public Defaultvalue:string;
    public MinRootVolSize:number;
}

export class Size {

    public ID:string;
    public Description:string;
    public Defaultvalue:string;
}

export class Subnet {

    public ID:string;
    public Description:string;
    public Defaultvalue:string;
}




