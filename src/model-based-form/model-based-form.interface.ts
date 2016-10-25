export interface StdProvisioning {
    projectName:string;
    name:string;
    OS:string;
    Size:string;
    RootVolumeSize:number;
    additionalDisks :AdditionalDisk[];
    Subnet:string;
}

export interface AdditionalDisk  {
    size:number;
}