import cron from 'node-cron';
import { config } from './config/environment';
import { cacheService } from './services/cache';
import { checkAppointments } from './utils/appointmentChecker';

// Önbellek temizleme işlemini başlat
cacheService.startCleanupInterval();

// Zamanlanmış görevi başlat
cron.schedule(config.app.checkInterval, checkAppointments);
console.log(`Vize randevu kontrolü başlatıldı.\nKontrol sıklığı: ${config.app.checkInterval}\n`);
console.log(`Takip edilen vize ülkeleri: ${config.app.targetCountry}`);
console.log(`Takip edilen şehirler: ${config.app.missionCountries.join(', ')}`);
if (config.app.targetCities.length > 0) {
  console.log(`Hedef şehirler: ${config.app.targetCities.join(', ')}`);
}

// İlk kontrolü yap
void checkAppointments();