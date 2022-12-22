
export type QueryFields<Fields> = Partial<Fields> & {
   id?: number;
   creator_id?: number;
   include?: { [key: string]: any },
   searchField?: keyof Fields;
   q?: string;
   perpage?: number;
   page?: number;
   date_from?: string;
   date_to?: string;
}

export type ApiTokenFields = {
   secret_key: string;
   website: string;
   status: "active" | "deactive" | "trash";
   permissions: string;
   user_id: number;
}

export type ApiTokkenQuery = QueryFields<ApiTokenFields>


export type MediaFields = {
   name: string;
   url: string;
   type: "unknown" | "image" | "audio" | "video" | "archive" | "document" | "pdf";
   mimetype: string;
   size: number;
}

export type MediaQuery = QueryFields<MediaFields>


export type NotificationFields = {
   title: string;
   type: string;
   content: string;
   user_id: number;
   viewed_on?: string;
   expire_on?: string;
}

export type NotificationQuery = QueryFields<NotificationFields>


export type OptionFields = {
   key: string;
   value: string;
}

export type OptionQuery = QueryFields<OptionFields>



export type PostFields = {
   title: string;
   type: string;
   content?: string;
   parent_id?: number;
   slug?: string;
   excerpt?: string;
   status?: "trash" | "publish" | "private" | "protected" | "draft";
   thumbnail_id?: number;
}

export type PostQuery = QueryFields<PostFields>


export interface PostCommentFields {
   post_id: number;
   content: string;
   user_id: number;
   status?: "trash" | "private" | "public";
   likes?: number;
   dislikes?: number;
   reply_id?: number;
}


export type PostCommentQuery = QueryFields<PostCommentFields>


export interface PostMetaFields {
   post_id: number;
   key: string;
   value: string;
}
export type PostMetaQuery = QueryFields<PostMetaFields>



export interface PostTermFields {
   post_id: number;
   terms: number[];
}

export type PostTermQuery = QueryFields<PostTermFields & { term_id: number }>


export interface SessionFields {
   ua: string;
   ip: string;
   user_id: number;
}

export type SessionQuery = QueryFields<SessionFields & {
   sid: string;
   expire_on: any
}>


export interface TermFields {
   type: string;
   name: string;
   icon_id?: number;
   parent_id?: number;
   slug?: string;
   content?: string;
}

export type TermQuery = QueryFields<TermFields>



export interface TranslateFields {
   key: string;
   content: string;
   language_id: number;
}

export type TranslateQuery = QueryFields<TranslateFields>


export interface UserFields {
   firstname: string;
   email: string;
   password: string;
   role: UserRoles;
   lastname?: string;
   phone?: string;
   username?: string;
   status?: "active" | "deactive" | "panding" | "trash";
   photo_id?: number;
}

export type UserQuery = QueryFields<UserFields>


export interface UserMetaFields {
   user_id: number;
   key: string;
   value: string;
}


export type UserMetaQuery = QueryFields<UserMetaFields>


export interface VerificationFields {
   user_id: number;
   expire_on?: any;
}


export type VerificationQuery = QueryFields<VerificationFields & {
   id: number;
   token: string;
   code: string;
}>









/**
 * Model ApiToken
 * 
 */
export type ApiToken = {
   id: number
   secret_key: string
   website: string
   status: ApiTokenStatus
   permissions: string
   created_at: Date
   updated_at: Date
   user_id: number | null
   creator_id: number | null
}


export type UserRoles = "admin" | "student" | "manager" | "editor" | "teacherManager" | "teacher" | "courseManager" | "salesManager"

/**
 * Model User
 * 
 */
export type User = {
   id: number
   firstname: string | null
   lastname: string | null
   email: string
   phone: string | null
   password: string
   username: string | null
   status: UserStatusTypes | null
   created_at: Date | null
   updated_at: Date
   photo_id: number | null
   role: UserRoles;
   creator_id: number | null
}

/**
 * Model UserMeta
 * 
 */
export type UserMeta = {
   id: number
   user_id: number
   key: string
   value: string | null
   created_at: Date | null
   updated_at: Date
}

/**
 * Model Session
 * 
 */
export type Session = {
   id: number
   sid: string
   ua: string
   ip: string
   expire_on: string
   created_at: Date | null
   updated_at: Date
   user_id: number | null
}

/**
 * Model Verification
 * 
 */
export type Verification = {
   id: number
   token: string
   code: string
   expire_on: string
   created_at: Date | null
   updated_at: Date
   user_id: number | null
}

/**
 * Model Notification
 * 
 */
export type Notification = {
   id: number
   type: string
   title: string
   content: string | null
   viewed_on: string
   expire_on: string
   created_at: Date | null
   updated_at: Date
   user_id: number
}

/**
 * Model Post
 * 
 */
export type Post = {
   id: number
   type: string
   title: string
   content: string | null
   excerpt: string | null
   slug: string
   status: PostStatusTypes
   created_at: Date
   updated_at: Date
   thumbnail_id: number | null
   parent_id: number | null
   creator_id: number | null
}

/**
 * Model PostMeta
 * 
 */
export type PostMeta = {
   id: number
   post_id: number
   key: string
   value: string
   created_at: Date | null
   updated_at: Date
}

/**
 * Model PostTerm
 * 
 */
export type PostTerm = {
   id: number
   post_id: number
   term_id: number
   created_at: Date | null
   updated_at: Date
}

/**
 * Model Term
 * 
 */
export type Term = {
   id: number
   type: string
   name: string
   slug: string
   icon_id: number | null
   content: string | null
   parent_id: number | null
   created_at: Date
   updated_at: Date
   creator_id: number | null
}

/**
 * Model PostComment
 * 
 */
export type PostComment = {
   id: number
   content: string
   status: PostCommentStatus
   likes: number | null
   dislikes: number | null
   created_at: Date
   updated_at: Date
   post_id: number
   reply_id: number | null
   user_id: number | null
}

/**
 * Model Translate
 * 
 */
export type Translate = {
   id: number
   key: string
   content: string | null
   language_id: number
   creator_id: number | null
}

/**
 * Model Option
 * 
 */
export type Option = {
   id: number
   key: string
   value: string
   created_at: Date
   updated_at: Date
   creator_id: number | null
}

/**
 * Model Media
 * 
 */
export type Media = {
   id: number
   name: string
   url: string
   type: MediaType
   mimetype: string
   size: number
   created_at: Date | null
   updated_at: Date
   creator_id: number | null
}


export enum ApiTokenStatus {
   active,
   deactive,
   trash,
};


export enum UserRoleTypes {
   admin,
   user,
};

export enum UserRoleStatus {
   active,
   deactive,
   trash,
};



export enum UserStatusTypes {
   active,
   deactive,
   panding,
   trash,
};


export enum PostStatusTypes {
   publish,
   private,
   protected,
   draft,
   trash,
};

export enum PostCommentStatus {
   public,
   private,
   trash,
}

export enum MediaType {
   unknown,
   image,
   audio,
   video,
   archive,
   document,
   pdf
};
