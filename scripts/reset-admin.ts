// scripts/reset-admin.ts
import { DataSource } from 'typeorm';
// bcrypt may not expose type declarations in this project.
// @ts-ignore -- the package is available at runtime.
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

async function resetAdmin() {
  console.log('🔄 Début de la réinitialisation...');
  
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'tohana_db',
    entities: ['src/**/*.entity.ts'],
    synchronize: false,
  });

  await dataSource.initialize();
  console.log('📦 Base de données connectée');

  // 1. Supprimer l'ancien utilisateur
  await dataSource.query('DELETE FROM users WHERE email = $1', ['admin@tohana.mg']);
  console.log('🗑️  Ancien utilisateur supprimé');

  // 2. Générer un hash avec bcrypt
  const password = 'tohana400#';
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log('🔑 Hash généré:', hashedPassword);

  // 3. Vérifier que le hash est valide
  const isValid = await bcrypt.compare(password, hashedPassword);
  console.log('✅ Test de comparaison réussi?', isValid);

  if (!isValid) {
    console.log('❌ Le hash n\'est pas valide');
    await dataSource.destroy();
    return;
  }

  // 4. Créer le nouvel utilisateur
  await dataSource.query(
    `INSERT INTO users (email, password, name, role, "isActive", "createdAt", "updatedAt")
     VALUES ($1, $2, $3, $4, $5, NOW(), NOW())`,
    ['admin@tohana.mg', hashedPassword, 'RAZAFIMAHEFA Harivelo', 'ADMIN', true]
  );
  console.log('✅ Admin créé avec succès');

  // 5. Vérification finale
  const user = await dataSource.query(
    'SELECT id, email, password, name, role FROM users WHERE email = $1',
    ['admin@tohana.mg']
  );
  
  if (user.length > 0) {
    console.log('👤 Utilisateur créé:', user[0].email);
    console.log('📝 Hash stocké:', user[0].password);
    console.log('🎯 Rôle:', user[0].role);
  } else {
    console.log('❌ Erreur: Utilisateur non trouvé après création');
  }

  await dataSource.destroy();
  console.log('✅ Script terminé');
}

resetAdmin().catch((error) => {
  console.error('❌ Erreur:', error);
  process.exit(1);
});