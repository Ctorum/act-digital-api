CREATE TABLE surveys (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    questions TEXT[],     
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE survey_responses (
    id SERIAL PRIMARY KEY,
    survey_id INT NOT NULL REFERENCES surveys(id) ON DELETE CASCADE,
    response JSONB,
    stars INT CHECK (stars BETWEEN 1 AND 5),
    email VARCHAR(255) NOT NULL,
    target_audience VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);