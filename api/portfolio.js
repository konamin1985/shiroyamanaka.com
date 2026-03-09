export default async function handler(req, res) {
    const NOTION_API_KEY = process.env.NOTION_API_KEY;
    const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

    if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
        return res.status(500).json({ error: 'Missing environment variables' });
    }

    try {
        const response = await fetch(
            `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${NOTION_API_KEY}`,
                    'Notion-Version': '2022-06-28',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sorts: [{ property: 'å¹´', direction: 'descending' }],
                }),
            }
        );

        if (!response.ok) {
            const err = await response.text();
            return res.status(response.status).json({ error: err });
        }

        const data = await response.json();

        const works = data.results.map((page, index) => {
            const p = page.properties;
            const title = p['åå']?.title?.[0]?.plain_text ?? '';
            const imageUrl = p['ç»åURL']?.rich_text?.[0]?.plain_text ?? '';
            const category = p['ã«ãã´ãªã¼']?.rich_text?.[0]?.plain_text ?? '';
            const year = p['å¹´']?.rich_text?.[0]?.plain_text ?? '';
            const description = p['èª¬æ']?.rich_text?.[0]?.plain_text ?? '';
            const backstoryRaw = p['ããã¯ã¹ãã¼ãªã¼']?.rich_text?.map(t => t.plain_text).join('') ?? '';
            const backstory = backstoryRaw
                ? '<p>' + backstoryRaw.split('\n').filter(s => s.trim()).join('</p><p>') + '</p>'
                : null;

            const photosRaw = p['写真URLs']?.rich_text?.map(t => t.plain_text).join('') ?? '';
            const photos = photosRaw ? photosRaw.split('\n').map(s => s.trim()).filter(Boolean) : [];
            const key = title
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]/g, '') || `work-${index + 1}`;

            return {
                key,
                title,
                tag: [category, year].filter(Boolean).join(' Â· '),
                num: String(index + 1).padStart(2, '0'),
                imageUrl,
                year,
                type: description,
                client: '',
                location: '',
                role: '',
                backstory,
                photos,
            };
        });

        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
        return res.status(200).json(works);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
