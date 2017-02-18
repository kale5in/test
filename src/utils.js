function getRegions(array) {
  return array.filter((item) => !item.id.includes('-'));
}

export function getCities(array) {
  return array.filter((item) => item.id.includes('-')).map((item) => {
    const parts = item.id.split('-');
    return { id: parts[1], regionId: parts[0], name: item.region };
  });
}

function populatedRegion(regionList, citiesList) {
  return regionList.map((region) => {
    const filtredCities = citiesList.filter((city) => city.regionId === region.id);
    return {
      id: region.id,
      name: region.region,
      cities: filtredCities.map((city) => {
        return { id: city.id, name: city.name };
      })
    };
  });
}

export function generateData(data) {
  const regionList = getRegions(data);
  const cityList = getCities(data);
  return populatedRegion(regionList, cityList);
}

export function getVisibleData(data, query) {
  if (!query) return;

  const list = [];

  for (let i = 0; i < data.length - 1; i++) {
    const region = data[i];
    list.push({ id: region.id, name: region.name });

    for (let j = 0; j < region.cities.length; j++) {
      const city = region.cities[j];

      list.push({ id: city.id, name: city.name + ` (${region.name})` })
    }
  }

  return list;
}
