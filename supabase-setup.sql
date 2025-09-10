-- SQL script para crear las tablas necesarias en Supabase
-- Ejecutar en el SQL Editor de Supabase Dashboard

-- Tabla de perfiles de usuario (extiende auth.users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    PRIMARY KEY (id)
);

-- Tabla de retos
CREATE TABLE challenges (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT CHECK (category IN ('fitness', 'nutrition', 'wellness')) DEFAULT 'fitness',
    difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')) DEFAULT 'medium',
    duration_days INTEGER DEFAULT 30,
    participants_count INTEGER DEFAULT 0,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabla de eventos
CREATE TABLE events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    location TEXT NOT NULL,
    modality TEXT CHECK (modality IN ('presencial', 'virtual', 'híbrido')) DEFAULT 'presencial',
    price DECIMAL(10,2) DEFAULT 0,
    max_participants INTEGER DEFAULT 50,
    current_participants INTEGER DEFAULT 0,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabla de posts
CREATE TABLE posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    type TEXT CHECK (type IN ('achievement', 'workout', 'promotion', 'tip', 'product')) DEFAULT 'workout',
    images TEXT[], -- Array de URLs de imágenes
    price DECIMAL(10,2), -- Para posts de productos
    product_name TEXT, -- Para posts de productos
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    shares_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabla intermedia: usuarios y retos
CREATE TABLE user_challenges (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE,
    progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    UNIQUE(user_id, challenge_id)
);

-- Tabla intermedia: usuarios y eventos
CREATE TABLE user_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, event_id)
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_events ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas RLS para challenges
CREATE POLICY "Anyone can view challenges" ON challenges FOR SELECT USING (true);

-- Políticas RLS para events  
CREATE POLICY "Anyone can view events" ON events FOR SELECT USING (true);

-- Políticas RLS para posts
CREATE POLICY "Anyone can view posts" ON posts FOR SELECT USING (true);
CREATE POLICY "Users can create posts" ON posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own posts" ON posts FOR UPDATE USING (auth.uid() = user_id);

-- Políticas RLS para user_challenges
CREATE POLICY "Users can view own challenges" ON user_challenges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can join challenges" ON user_challenges FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own challenge progress" ON user_challenges FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can leave challenges" ON user_challenges FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS para user_events
CREATE POLICY "Users can view own events" ON user_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can register for events" ON user_events FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unregister from events" ON user_events FOR DELETE USING (auth.uid() = user_id);

-- Función para crear perfil automáticamente cuando se registra un usuario
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para ejecutar la función anterior
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insertar datos de ejemplo
INSERT INTO challenges (title, description, category, difficulty, duration_days, participants_count) VALUES
('Cardio Intenso', '30 días de ejercicio cardiovascular diario', 'fitness', 'hard', 30, 147),
('Nutrición Saludable', 'Mejora tus hábitos alimenticios', 'nutrition', 'medium', 21, 89),
('Mindfulness Diario', 'Meditación y bienestar mental', 'wellness', 'easy', 14, 203);

INSERT INTO events (title, description, event_date, event_time, location, modality, price, max_participants, current_participants) VALUES
('Yoga Matutino', 'Sesión de yoga para comenzar el día', CURRENT_DATE + INTERVAL '1 day', '07:00', 'Parque Simón Bolívar', 'presencial', 15000, 30, 18),
('Maratón Virtual 5K', 'Corre desde donde estés', CURRENT_DATE + INTERVAL '7 days', '06:00', 'Modalidad Virtual', 'virtual', 25000, 200, 67),
('Taller de Nutrición', 'Aprende a crear meal prep saludable', CURRENT_DATE + INTERVAL '3 days', '14:00', 'Centro Comercial Andino', 'presencial', 35000, 25, 12);