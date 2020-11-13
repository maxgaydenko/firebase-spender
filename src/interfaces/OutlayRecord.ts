export interface IDbOutlayRecord {
 when: string
 price: number
 section: string
 tags: string[]
 comment?: string
}

export interface IOutlayRecord extends IDbOutlayRecord {
 id: string
}

export const NEW_ID = "new_id";