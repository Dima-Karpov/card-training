import axios from "axios";
import { ProfileResponseType } from "../bll/reducer/auth-reducer/auth-reducer";
import { SortPacksAndCardsOrderType } from "../bll/reducer/packsList-reducer";



// http://localhost:7542/2.0/
// https://neko-back.herokuapp.com/2.0/

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
});

export const authAPI = {
    me(){
       return instance.post<LoginUserResponseType>(`auth/me`, {}) 
    },
    login(email: string, password: string, rememberMe: boolean){
        return instance.post<LoginUserResponseType>(`auth/login`, {email, password, rememberMe})
    },
    logout(){
        return instance.delete<LogoutResponceType>(`auth/me`, {})
    },
    singUp(email: string, password: string){
        return instance.post<LoginUserResponseType>(`auth/register`, {email, password})
    },
    restorePassword(email: string){
        return instance.post(`auth/forgot`, {
            email: email,
            from: `test-front <dimka.karpov111@gmail.com>`,
            message: `<div style="background-color: lime; padding: 15px">
                            Click <a href='http://localhost:3000/card-training#/updatePassword/$token$'>here</a> to restore your password
                      </div>`
        })
    },
    updateUserData(name: string, avatar: string | undefined | null){
        return instance.put<UpdateUserDataResponseType>(`auth/me`, {name, avatar})
    },
};

export const packsListApi = {
    getPacks(packName: string, min: number, max: number, sortPacksOrder: SortPacksAndCardsOrderType, 
        sortPacksFilter: string, page: number, pageCount: number, user_id: string){
            return instance.get<GetPacksResponseType>(`/cards/pack?packName=${packName}&min=${min}&max=${max}&sortPacks=${sortPacksOrder}${sortPacksFilter}&page=${page}&pageCount=${pageCount}$user_id=${user_id}`)
    },
    addPack(packName: string){
        return instance.post<AddPacksResponseType>(`cards/pack`, {cardsPack: {name: packName}})
    },
    updatePack(packName: string, packId: string){
        return instance.put<UpdatePackResponseType>(`cards/pack`, {cardsPack: {_id: packId, name: packName}})
    },
    deletePack(packId: string){
        return instance.delete<DeletePackResponseType>(`cards/pack?id=${packId}`)
    },
};

export const cardsApi = {
    getCards(packId: string, page?: number, pageCount?: number, question?: string, sortCardsOrder?: SortPacksAndCardsOrderType, sortCardsFilter?: string, answer?: string, min?: number, max?: number ){
        return instance.get<GetCardsResponseType>(`/cards/card?cardQuestion=${question ? question : ''}&cardsPack_id=${packId}&page=${page}&pageCount=${pageCount}&sortCards=${sortCardsOrder}${sortCardsFilter}`)
    },
    addCard(packId: string, question?: string, answer?: string){
        return instance.post<AddCardResponseType>(`/cards/card`, {card: {cardsPack_id: packId, question, answer}})
    },
    updateCard(cardId: string, question: string, answer: string){
        return instance.put<UpdateCardResponseType>(`/cards/card`, {card: {_id: cardId, question, answer}})
    },
    deleteCard(cardId: string){
        return instance.delete<DeleteCardResponseType>(`/cards/card?id=${cardId}`)
    },
};

export const learnPackApi = {
    gradeCard(card_id: string, grade: number){
        return instance.put(`/cards/grade`, {card_id, grade})
    },
};


// types
export type UserDataType = {
    _id: string
    email: string
    name: string
    avatar: string | undefined
    publicCardPacksCount: number

    created: string
    updated: string
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean

    error?: string
}


export type LoginUserResponseType = ProfileResponseType;
export type LogoutResponceType = {
    info: string
}
export type UpdateUserDataResponseType = {
    token: string
    tokenDeathTime: number
    updateUser: UserDataType
}

export type PackResponseType = {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: false
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}

export type GetPacksResponseType = {
    cardPasks: PackResponseType[]
    cardPasksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}
export type AddPacksResponseType = {
    newCardsPack: PackResponseType  
    token: string
    tokenDeathTime: number  
}
export type UpdatePackResponseType = {
    updateCardsPack: PackResponseType  
    token: string
    tokenDeathTime: number  
}
export type DeletePackResponseType = {
    deletedCardsPack: PackResponseType  
    token: string
    tokenDeathTime: number  
}
export type CardType = {
    answer: string
    cardsPack_id: string
    comments: string
    created: string
    grade: number
    more_id: string
    question: string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: string
}
export type GetCardsResponseType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string 
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export type AddCardResponseType = {
    newCard: CardType
    token: string
    tokenDeathTime: number
}
export type UpdateCardResponseType = {
    updatedCard: CardType
    token: string
    tokenDeathTime: number
}
export type DeleteCardResponseType = {
    deletedCard: CardType
    token: string
    tokenDeathTime: number
}