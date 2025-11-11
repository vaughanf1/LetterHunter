-- Create media_companies table
CREATE TABLE IF NOT EXISTS media_companies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    website_url TEXT,
    traffic_size TEXT,
    total_newsletters INTEGER DEFAULT 0,
    estimated_min_subscribers INTEGER,
    estimated_max_subscribers INTEGER,
    topic_categories TEXT[],
    last_scraped_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create newsletters table
CREATE TABLE IF NOT EXISTS newsletters (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID REFERENCES media_companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    frequency TEXT,
    estimated_subscribers INTEGER,
    topic TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_media_companies_name ON media_companies(name);
CREATE INDEX IF NOT EXISTS idx_media_companies_traffic_size ON media_companies(traffic_size);
CREATE INDEX IF NOT EXISTS idx_media_companies_total_newsletters ON media_companies(total_newsletters);
CREATE INDEX IF NOT EXISTS idx_newsletters_company_id ON newsletters(company_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_media_companies_updated_at BEFORE UPDATE ON media_companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_newsletters_updated_at BEFORE UPDATE ON newsletters
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (optional - remove if you have real data)
INSERT INTO media_companies (name, website_url, traffic_size, total_newsletters, estimated_min_subscribers, estimated_max_subscribers, topic_categories, last_scraped_at)
VALUES
    ('TechCrunch', 'https://techcrunch.com', '1M-5M', 5, 100000, 500000, ARRAY['Technology', 'Startups'], NOW()),
    ('The New York Times', 'https://nytimes.com', '5M+', 15, 500000, 2000000, ARRAY['News', 'Politics', 'Culture'], NOW()),
    ('Morning Brew', 'https://morningbrew.com', '500K-1M', 8, 50000, 150000, ARRAY['Business', 'Finance'], NOW()),
    ('The Hustle', 'https://thehustle.co', '500K-1M', 4, 100000, 300000, ARRAY['Business', 'Technology'], NOW()),
    ('Axios', 'https://axios.com', '1M-5M', 12, 200000, 800000, ARRAY['News', 'Politics', 'Business'], NOW());

-- Insert sample newsletters
INSERT INTO newsletters (company_id, name, description, frequency, estimated_subscribers, topic)
SELECT
    id,
    'Daily Digest',
    'Your daily dose of news and insights',
    'Daily',
    100000,
    'General'
FROM media_companies
WHERE name = 'TechCrunch'
LIMIT 1;
