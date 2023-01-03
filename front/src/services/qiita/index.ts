import ky from "ky";
import { JSDOM } from 'jsdom';
import { ParsedQiitaItem, QiitaReport } from "types/data";

const getQiitaReports = async ():Promise<Array<ParsedQiitaItem>>=> {
    const res = await ky.get(
        'https://qiita.com/api/v2/authenticated_user/items',
        {
            headers: {
              Authorization: `Bearer ${process.env.QIITA_TOKEN}`,
            },
          }
    );
    const resItems = (await res.json()) as QiitaReport[];
    const dataList = await Promise.all(
        resItems.map(async (item: QiitaReport) => {
            const response = await ky.get(item.url);
            const text = await response.text();
            const dom = new JSDOM(text);
            const meta = dom.window.document.querySelectorAll("head > meta");
            const imgUrl = Array.from(meta).find((el):boolean => {
                return el.getAttribute("property") == "og:image"
            })
            const data:ParsedQiitaItem = {
                coediting: item.coediting,
                comments_count: item.comments_count,
                created_at: item.created_at,
                id: item.id,
                likes_count: item.likes_count,
                ogpImageUrl: imgUrl?.getAttribute("content")??"",
                page_views_count: item.page_views_count,
                private: item.private,
                reactions_count: item.reactions_count,
                tags: item.tags,
                title: item.title,
                updated_at: item.updated_at,
                url: item.url,
              }
            return data
        }),
      )
    return dataList //https://qiita.com/api/v2/docs#get-apiv2authenticated_useritems
  }

  export default getQiitaReports