<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class LocationSeeder extends Seeder
{
    public function run(): void
    {
        $voivodeships = [
            ['name' => 'Dolnośląskie', 'name_uk' => 'Нижньосілезьке', 'lat' => 51.1079, 'lng' => 17.0385],
            ['name' => 'Kujawsko-Pomorskie', 'name_uk' => 'Куявсько-Поморське', 'lat' => 53.0138, 'lng' => 18.5984],
            ['name' => 'Lubelskie', 'name_uk' => 'Люблінське', 'lat' => 51.2465, 'lng' => 22.5684],
            ['name' => 'Lubuskie', 'name_uk' => 'Любуське', 'lat' => 52.0702, 'lng' => 15.2393],
            ['name' => 'Łódzkie', 'name_uk' => 'Лодзінське', 'lat' => 51.7592, 'lng' => 19.4560],
            ['name' => 'Małopolskie', 'name_uk' => 'Малопольське', 'lat' => 49.8419, 'lng' => 20.2958],
            ['name' => 'Mazowieckie', 'name_uk' => 'Мазовецьке', 'lat' => 52.2297, 'lng' => 21.0122],
            ['name' => 'Opolskie', 'name_uk' => 'Опольське', 'lat' => 50.6751, 'lng' => 17.9213],
            ['name' => 'Podkarpackie', 'name_uk' => 'Підкарпатське', 'lat' => 50.0413, 'lng' => 22.0053],
            ['name' => 'Podlaskie', 'name_uk' => 'Підляське', 'lat' => 53.1325, 'lng' => 23.1688],
            ['name' => 'Pomorskie', 'name_uk' => 'Поморське', 'lat' => 54.3520, 'lng' => 18.6466],
            ['name' => 'Śląskie', 'name_uk' => 'Сілезьке', 'lat' => 50.2649, 'lng' => 19.0238],
            ['name' => 'Świętokrzyskie', 'name_uk' => 'Свентокшиське', 'lat' => 50.8661, 'lng' => 20.6286],
            ['name' => 'Warmińsko-Mazurskie', 'name_uk' => 'Вармінсько-Мазурське', 'lat' => 53.8700, 'lng' => 20.8800],
            ['name' => 'Wielkopolskie', 'name_uk' => 'Великопольське', 'lat' => 52.4064, 'lng' => 16.9252],
            ['name' => 'Zachodniopomorskie', 'name_uk' => 'Західнопоморське', 'lat' => 53.4285, 'lng' => 14.5528],
        ];

        $cities = [
            'Mazowieckie' => ['Warszawa', 'Radom', 'Płock', 'Siedlce', 'Pruszków', 'Otwock', 'Legionowo'],
            'Małopolskie' => ['Kraków', 'Tarnów', 'Nowy Sącz', 'Oświęcim', 'Zakopane'],
            'Śląskie' => ['Katowice', 'Częstochowa', 'Sosnowiec', 'Gliwice', 'Zabrze', 'Bielsko-Biała', 'Bytom', 'Rybnik', 'Tychy', 'Dąbrowa Górnicza'],
            'Dolnośląskie' => ['Wrocław', 'Wałbrzych', 'Legnica', 'Jelenia Góra'],
            'Wielkopolskie' => ['Poznań', 'Kalisz', 'Konin', 'Piła', 'Leszno', 'Gniezno'],
            'Pomorskie' => ['Gdańsk', 'Gdynia', 'Sopot', 'Słupsk', 'Tczew', 'Wejherowo'],
            'Łódzkie' => ['Łódź', 'Piotrków Trybunalski', 'Tomaszów Mazowiecki', 'Bełchatów'],
            'Zachodniopomorskie' => ['Szczecin', 'Koszalin', 'Stargard', 'Kołobrzeg', 'Świnoujście'],
            'Lubelskie' => ['Lublin', 'Chełm', 'Zamość', 'Biała Podlaska', 'Puławy'],
            'Kujawsko-Pomorskie' => ['Bydgoszcz', 'Toruń', 'Włocławek', 'Grudziądz', 'Inowrocław'],
            'Podkarpackie' => ['Rzeszów', 'Przemyśl', 'Stalowa Wola', 'Mielec', 'Tarnobrzeg', 'Krosno'],
            'Warmińsko-Mazurskie' => ['Olsztyn', 'Elbląg', 'Ełk'],
            'Opolskie' => ['Opole', 'Kędzierzyn-Koźle', 'Nysa'],
            'Lubuskie' => ['Gorzów Wielkopolski', 'Zielona Góra', 'Nowa Sól'],
            'Podlaskie' => ['Białystok', 'Suwałki', 'Łomża'],
            'Świętokrzyskie' => ['Kielce', 'Ostrowiec Świętokrzyski', 'Starachowice'],
        ];

        foreach ($voivodeships as $voivodeshipData) {
            $voivodeshipSlug = Str::slug($voivodeshipData['name']);

            $voivodeship = Location::updateOrCreate(
                ['slug' => $voivodeshipSlug],
                [
                    'name' => $voivodeshipData['name'],
                    'name_uk' => $voivodeshipData['name_uk'],
                    'type' => 'voivodeship',
                    'lat' => $voivodeshipData['lat'],
                    'lng' => $voivodeshipData['lng'],
                ]
            );

            if (isset($cities[$voivodeshipData['name']])) {
                foreach ($cities[$voivodeshipData['name']] as $cityName) {
                    $citySlug = Str::slug($voivodeshipData['name'] . '-' . $cityName);

                    $existingCity = Location::cities()
                        ->where('parent_id', $voivodeship->id)
                        ->where('name', $cityName)
                        ->first();

                    if ($existingCity) {
                        $existingCity->update([
                            'slug' => $citySlug,
                            'parent_id' => $voivodeship->id,
                        ]);
                    } else {
                        Location::updateOrCreate(
                            ['slug' => $citySlug],
                            [
                                'name' => $cityName,
                                'type' => 'city',
                                'parent_id' => $voivodeship->id,
                            ]
                        );
                    }
                }
            }
        }
    }
}
