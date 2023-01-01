export interface Report {
  id: int
  author: string
  tags: string
  content: string
  created_at: any
  updated_at: any
}

export interface ApiContext {
  apiRootUrl: string
}


export interface QiitaReport {
  rendered_body: string,
  body: string,
  coediting: boolean,
  comments_count: number,
  created_at: string,
  group: {
    created_at: string,
    description: string,
    name: string,
    private: boolean,
    updated_at: string,
    url_name: string
  },
  id: string,
  likes_count: number,
  private: boolean,
  reactions_count: number,
  stocks_count: number,
  tags: {
      name: string,
      versions: []
    }[],
  title: string,
  updated_at: string,
  url: string,
  user: {
    description: string,
    facebook_id: string,
    followees_count: number,
    followers_count: number,
    github_login_name: string,
    id: string,
    items_count: number,
    linkedin_id: string,
    location: string,
    name: string,
    organization: string,
    permanent_id: number,
    profile_image_url: string,
    team_only: boolean,
    twitter_screen_name: string,
    website_url: string
  },
  page_views_count: number,
  team_membership: {
    name: string
  }
}

export interface ParsedQiitaItem {
  coediting: boolean;
  comments_count: number;
  created_at: string;
  id: string;
  likes_count: number;
  ogpImageUrl: string;
  page_views_count: number;
  private: boolean;
  reactions_count: number;
  tags: { name: string; versions: [] }[];
  title: string;
  updated_at: string;
  url: string;
};