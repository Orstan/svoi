<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        Category::truncate();
        Schema::enableForeignKeyConstraints();

        $categories = [
            [
                'name_uk' => 'Краса',
                'name_pl' => 'Uroda',
                'name_en' => 'Beauty',
                'icon' => '💅',
                'order' => 1,
                'children' => [
                    ['name_uk' => 'Манікюр', 'name_pl' => 'Manicure', 'name_en' => 'Manicure'],
                    ['name_uk' => 'Педикюр', 'name_pl' => 'Pedicure', 'name_en' => 'Pedicure'],
                    ['name_uk' => 'Перукар', 'name_pl' => 'Fryzjer', 'name_en' => 'Hairdresser'],
                    ['name_uk' => 'Масаж', 'name_pl' => 'Masaż', 'name_en' => 'Massage'],
                    ['name_uk' => 'Косметолог', 'name_pl' => 'Kosmetolog', 'name_en' => 'Cosmetologist'],
                    ['name_uk' => 'Брови та вії', 'name_pl' => 'Brwi i rzęsy', 'name_en' => 'Brows and Lashes'],
                    ['name_uk' => 'Візаж', 'name_pl' => 'Makijaż', 'name_en' => 'Makeup'],
                ]
            ],
            [
                'name_uk' => 'Ремонт',
                'name_pl' => 'Remont',
                'name_en' => 'Repair',
                'icon' => '🔨',
                'order' => 2,
                'children' => [
                    ['name_uk' => 'Сантехнік', 'name_pl' => 'Hydraulik', 'name_en' => 'Plumber'],
                    ['name_uk' => 'Електрик', 'name_pl' => 'Elektryk', 'name_en' => 'Electrician'],
                    ['name_uk' => 'Малярські роботи', 'name_pl' => 'Malowanie', 'name_en' => 'Painting'],
                    ['name_uk' => 'Укладання плитки', 'name_pl' => 'Układanie płytek', 'name_en' => 'Tile Installation'],
                    ['name_uk' => 'Меблі на замовлення', 'name_pl' => 'Meble na zamówienie', 'name_en' => 'Custom Furniture'],
                    ['name_uk' => 'Зварювальні роботи', 'name_pl' => 'Spawanie', 'name_en' => 'Welding'],
                    ['name_uk' => 'Монтаж кондиціонерів', 'name_pl' => 'Montaż klimatyzacji', 'name_en' => 'Air Conditioner Installation'],
                ]
            ],
            [
                'name_uk' => 'Авто',
                'name_pl' => 'Auto',
                'name_en' => 'Auto',
                'icon' => '🚗',
                'order' => 3,
                'children' => [
                    ['name_uk' => 'Автомеханік', 'name_pl' => 'Mechanik samochodowy', 'name_en' => 'Auto Mechanic'],
                    ['name_uk' => 'Автоелектрик', 'name_pl' => 'Elektryk samochodowy', 'name_en' => 'Auto Electrician'],
                    ['name_uk' => 'Шиномонтаж', 'name_pl' => 'Wymiana opon', 'name_en' => 'Tire Service'],
                    ['name_uk' => 'Детейлінг', 'name_pl' => 'Detailing', 'name_en' => 'Detailing'],
                    ['name_uk' => 'Кузовні роботи', 'name_pl' => 'Blacharstwo', 'name_en' => 'Bodywork'],
                    ['name_uk' => 'Діагностика', 'name_pl' => 'Diagnostyka', 'name_en' => 'Diagnostics'],
                ]
            ],
            [
                'name_uk' => 'Освіта',
                'name_pl' => 'Edukacja',
                'name_en' => 'Education',
                'icon' => '📚',
                'order' => 4,
                'children' => [
                    ['name_uk' => 'Репетитор з польської', 'name_pl' => 'Korepetytor języka polskiego', 'name_en' => 'Polish Tutor'],
                    ['name_uk' => 'Репетитор з математики', 'name_pl' => 'Korepetytor matematyki', 'name_en' => 'Math Tutor'],
                    ['name_uk' => 'Репетитор з англійської', 'name_pl' => 'Korepetytor języka angielskiego', 'name_en' => 'English Tutor'],
                    ['name_uk' => 'Підготовка до іспитів', 'name_pl' => 'Przygotowanie do egzaminów', 'name_en' => 'Exam Preparation'],
                    ['name_uk' => 'Музика', 'name_pl' => 'Muzyka', 'name_en' => 'Music'],
                ]
            ],
            [
                'name_uk' => 'Діти',
                'name_pl' => 'Dzieci',
                'name_en' => 'Kids',
                'icon' => '👶',
                'order' => 5,
                'children' => [
                    ['name_uk' => 'Няня', 'name_pl' => 'Opiekunka do dziecka', 'name_en' => 'Nanny'],
                    ['name_uk' => 'Аніматор', 'name_pl' => 'Animator', 'name_en' => 'Animator'],
                    ['name_uk' => 'Логопед', 'name_pl' => 'Logopeda', 'name_en' => 'Speech Therapist'],
                    ['name_uk' => 'Підготовка до школи', 'name_pl' => 'Przygotowanie do szkoły', 'name_en' => 'School Preparation'],
                ]
            ],
            [
                'name_uk' => 'Побут',
                'name_pl' => 'Dom',
                'name_en' => 'Home',
                'icon' => '🏠',
                'order' => 6,
                'children' => [
                    ['name_uk' => 'Прибирання', 'name_pl' => 'Sprzątanie', 'name_en' => 'Cleaning'],
                    ['name_uk' => 'Прання та прасування', 'name_pl' => 'Pranie i prasowanie', 'name_en' => 'Laundry'],
                    ['name_uk' => 'Кур\'єрські послуги', 'name_pl' => 'Usługi kurierskie', 'name_en' => 'Courier Services'],
                    ['name_uk' => 'Переїзди', 'name_pl' => 'Przeprowadzki', 'name_en' => 'Moving'],
                    ['name_uk' => 'Ремонт техніки', 'name_pl' => 'Naprawa sprzętu', 'name_en' => 'Appliance Repair'],
                ]
            ],
            [
                'name_uk' => 'IT',
                'name_pl' => 'IT',
                'name_en' => 'IT',
                'icon' => '💻',
                'order' => 7,
                'children' => [
                    ['name_uk' => 'Веб-розробка', 'name_pl' => 'Tworzenie stron internetowych', 'name_en' => 'Web Development'],
                    ['name_uk' => 'Графічний дизайн', 'name_pl' => 'Projektowanie graficzne', 'name_en' => 'Graphic Design'],
                    ['name_uk' => 'Ремонт комп\'ютерів', 'name_pl' => 'Naprawa komputerów', 'name_en' => 'Computer Repair'],
                    ['name_uk' => 'Налаштування техніки', 'name_pl' => 'Konfiguracja sprzętu', 'name_en' => 'Device Setup'],
                    ['name_uk' => 'SMM', 'name_pl' => 'SMM', 'name_en' => 'SMM'],
                    ['name_uk' => 'SEO', 'name_pl' => 'SEO', 'name_en' => 'SEO'],
                ]
            ],
            [
                'name_uk' => 'Фото',
                'name_pl' => 'Foto',
                'name_en' => 'Photo',
                'icon' => '📸',
                'order' => 8,
                'children' => [
                    ['name_uk' => 'Фотограф', 'name_pl' => 'Fotograf', 'name_en' => 'Photographer'],
                    ['name_uk' => 'Відеограф', 'name_pl' => 'Kamerzysta', 'name_en' => 'Videographer'],
                    ['name_uk' => 'Монтаж відео', 'name_pl' => 'Montaż wideo', 'name_en' => 'Video Editing'],
                    ['name_uk' => 'Зйомка з дрона', 'name_pl' => 'Ujęcia z drona', 'name_en' => 'Drone Footage'],
                ]
            ],
        ];

        foreach ($categories as $categoryData) {
            $children = $categoryData['children'] ?? [];
            unset($categoryData['children']);

            $category = Category::create([
                'name_uk' => $categoryData['name_uk'],
                'name_pl' => $categoryData['name_pl'],
                'name_en' => $categoryData['name_en'],
                'slug' => Str::slug($categoryData['name_pl']),
                'icon' => $categoryData['icon'],
                'order' => $categoryData['order'] ?? 0,
                'is_active' => true,
            ]);

            foreach ($children as $childData) {
                Category::create([
                    'name_uk' => $childData['name_uk'],
                    'name_pl' => $childData['name_pl'],
                    'name_en' => $childData['name_en'],
                    'slug' => Str::slug($categoryData['name_pl'] . '-' . $childData['name_pl']),
                    'parent_id' => $category->id,
                    'order' => $childData['order'] ?? 0,
                    'is_active' => true,
                ]);
            }
        }
    }
}
