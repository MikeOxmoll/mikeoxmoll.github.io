export interface UserType {
    id_author: string,
    name: string,
    mail: string,
    username: string,
    id_profile_picture: string,
    role:string
}
export interface RessourceType {
    id: string,
    title: string,
    description:string,
    id_author: string,
    authorName:string,
    categoryIds?:string[],
    fileName:string,//
    isPrivate:boolean,
    uploadDate:number,//
}
export interface VideoType extends RessourceType{
    nbViews: number,
    duration: number,//
    idThumbnailImage: string,
}
export interface ImageType extends RessourceType{

}
enum CategoryDomType {
    Ethnicity, Scenario, Partners,LGBTQ,Actions,Attributes,Language_Spoken
    ,Age,Production,Miscellaneous
}

export interface CategoryType {
    id: string,
    name: string,
    type: string,
    authorId: string,
    idThumbnailImage:string
}

