<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name_uk' => 'Краса та здоров\'я',
                'name_pl' => 'Uroda i zdrowie',
                'name_en' => 'Beauty and Health',
                'icon' => '💅',
                'children' => [
                    ['name_uk' => 'Манікюр', 'name_pl' => 'Manicure', 'name_en' => 'Manicure'],
                    ['name_uk' => 'Педикюр', 'name_pl' => 'Pedicure', 'name_en' => 'Pedicure'],
                    ['name_uk' => 'Перукар', 'name_pl' => 'Fryzjer', 'name_en' => 'Hairdresser'],
                    ['name_uk' => 'Масаж', 'name_pl' => 'Masaż', 'name_en' => 'Massage'],
                    ['name_uk' => 'Косметолог', 'name_pl' => 'Kosmetolog', 'name_en' => 'Cosmetologist'],
                    ['name_uk' => 'Брови та вії', 'name_pl' => 'Brwi i rzęsy', 'name_en' => 'Brows and Lashes'],
                ]
            ],
            [
                'name_uk' => 'Ремонт та будівництво',
                'name_pl' => 'Remont i budownictwo',
                'name_en' => 'Repair and Construction',
                'icon' => '🔨',
                'children' => [
                    ['name_uk' => 'Сантехнік', 'name_pl' => 'Hydraulik', 'name_en' => 'Plumber'],
                    ['name_uk' => 'Електрик', 'name_pl' => 'Elektryk', 'name_en' => 'Electrician'],
                    ['name_uk' => 'Ремонт квартир', 'name_pl' => 'Remont mieszkań', 'name_en' => 'Apartment Renovation'],
                    ['name_uk' => 'Малярські роботи', 'name_pl' => 'Malowanie', 'name_en' => 'Painting'],
                    ['name_uk' => 'Укладання плитки', 'name_pl' => 'Układanie płytek', 'name_en' => 'Tile Installation'],
                    ['name_uk' => 'Меблі на замовлення', 'name_pl' => 'Meble na zamówienie', 'name_en' => 'Custom Furniture'],
                ]
            ],
            [
                'name_uk' => 'Автосервіс',
                'name_pl' => 'Serwis samochodowy',
                'name_en' => 'Auto Service',
                'icon' => '🚗',
                'children' => [
                    ['name_uk' => 'Автомеханік', 'name_pl' => 'Mechanik samochodowy', 'name_en' => 'Auto Mechanic'],
                    ['name_uk' => 'Автоелектрик', 'name_pl' => 'Elektryk samochodowy', 'name_en' => 'Auto Electrician'],
                    ['name_uk' => 'Шиномонтаж', 'name_pl' => 'Wymiana opon', 'name_en' => 'Tire Service'],
                    ['name_uk' => 'Автомийка', 'name_pl' => 'Myjnia samochodowa', 'name_en' => 'Car Wash'],
                ]
            ],
            [
                'name_uk' => 'Освіта та репетиторство',
                'name_pl' => 'Edukacja i korepetycje',
                'name_en' => 'Education and Tutoring',
                'icon' => '📚',
                'children' => [
                    ['name_uk' => 'Репетитор з польської', 'name_pl' => 'Korepetytor języka polskiego', 'name_en' => 'Polish Tutor'],
                    ['name_uk' => 'Репетитор з математики', 'name_pl' => 'Korepetytor matematyki', 'name_en' => 'Math Tutor'],
                    ['name_uk' => 'Репетитор з англійської', 'name_pl' => 'Korepetytor języka angielskiego', 'name_en' => 'English Tutor'],
                    ['name_uk' => 'Підготовка до іспитів', 'name_pl' => 'Przygotowanie do egzaminów', 'name_en' => 'Exam Preparation'],
                ]
            ],
            [
                'name_uk' => 'Догляд за дітьми',
                'name_pl' => 'Opieka nad dziećmi',
                'name_en' => 'Childcare',
                'icon' => '👶',
                'children' => [
                    ['name_uk' => 'Няня', 'name_pl' => 'Opiekunka do dziecka', 'name_en' => 'Nanny'],
                    ['name_uk' => 'Аніматор', 'name_pl' => 'Animator', 'name_en' => 'Animator'],
                ]
            ],
            [
                'name_uk' => 'Побутові послуги',
                'name_pl' => 'Usługi domowe',
                'name_en' => 'Household Services',
                'icon' => '🏠',
                'children' => [
                    ['name_uk' => 'Прибирання', 'name_pl' => 'Sprzątanie', 'name_en' => 'Cleaning'],
                    ['name_uk' => 'Прання та прасування', 'name_pl' => 'Pranie i prasowanie', 'name_en' => 'Laundry'],
                    ['name_uk' => 'Кур\'єрські послуги', 'name_pl' => 'Usługi kurierskie', 'name_en' => 'Courier Services'],
                ]
            ],
            [
                'name_uk' => 'IT та дизайн',
                'name_pl' => 'IT i design',
                'name_en' => 'IT and Design',
                'icon' => '💻',
                'children' => [
                    ['name_uk' => 'Веб-розробка', 'name_pl' => 'Tworzenie stron internetowych', 'name_en' => 'Web Development'],
                    ['name_uk' => 'Графічний дизайн', 'name_pl' => 'Projektowanie graficzne', 'name_en' => 'Graphic Design'],
                    ['name_uk' => 'Ремонт комп\'ютерів', 'name_pl' => 'Naprawa komputerów', 'name_en' => 'Computer Repair'],
                    ['name_uk' => 'Налаштування техніки', 'name_pl' => 'Konfiguracja sprzętu', 'name_en' => 'Device Setup'],
                ]
            ],
            [
                'name_uk' => 'Фото та відео',
                'name_pl' => 'Foto i wideo',
                'name_en' => 'Photo and Video',
                'icon' => '📸',
                'children' => [
                    ['name_uk' => 'Фотограф', 'name_pl' => 'Fotograf', 'name_en' => 'Photographer'],
                    ['name_uk' => 'Відеограф', 'name_pl' => 'Kamerzysta', 'name_en' => 'Videographer'],
                    ['name_uk' => 'Монтаж відео', 'name_pl' => 'Montaż wideo', 'name_en' => 'Video Editing'],
                ]
            ],
            [
                'name_uk' => 'Юридичні послуги',
                'name_pl' => 'Usługi prawne',
                'name_en' => 'Legal Services',
                'icon' => '⚖️',
                'children' => [
                    ['name_uk' => 'Юрист', 'name_pl' => 'Prawnik', 'name_en' => 'Lawyer'],
                    ['name_uk' => 'Податковий консультант', 'name_pl' => 'Doradca podatkowy', 'name_en' => 'Tax Consultant'],
                    ['name_uk' => 'Допомога з документами', 'name_pl' => 'Pomoc z dokumentami', 'name_en' => 'Document Assistance'],
                ]
            ],
            [
                'name_uk' => 'Перекладачі',
                'name_pl' => 'Tłumacze',
                'name_en' => 'Translators',
                'icon' => '🌍',
                'children' => [
                    ['name_uk' => 'Письмовий переклад', 'name_pl' => 'Tłumaczenie pisemne', 'name_en' => 'Written Translation'],
                    ['name_uk' => 'Усний переклад', 'name_pl' => 'Tłumaczenie ustne', 'name_en' => 'Interpretation'],
                    ['name_uk' => 'Присяжний перекладач', 'name_pl' => 'Tłumacz przysięgły', 'name_en' => 'Sworn Translator'],
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
                'is_active' => true,
            ]);

            foreach ($children as $childData) {
                Category::create([
                    'name_uk' => $childData['name_uk'],
                    'name_pl' => $childData['name_pl'],
                    'name_en' => $childData['name_en'],
                    'slug' => Str::slug($categoryData['name_pl'] . '-' . $childData['name_pl']),
                    'parent_id' => $category->id,
                    'is_active' => true,
                ]);
            }
        }
    }
}
