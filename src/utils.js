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

function queryFilter(query, item) {
  if (!query) return true;
  const queryParts = query.split(',');
  const itemParts = [item.id, item.name];

  return queryParts.some((queryPart) => itemParts.some((itemPart) => {
    const isNumber = !Number.isNaN(Number.parseInt(itemPart, 10));

    if (isNumber) {
      return itemPart === queryPart;
    }

    const preparedQueryPart = queryPart.toLowerCase().trim();
    const preparedItemPart = itemPart.toLowerCase().trim();

    return preparedItemPart.includes(preparedQueryPart)
  }));
}

export function getVisibleData(data, query) {
  const list = [];

  for (let i = 0; i < data.length - 1; i++) {
    const region = data[i];

    if (queryFilter(query, region)) {
      list.push({ id: region.id, name: region.name });
    }

    for (let j = 0; j < region.cities.length; j++) {
      const city = region.cities[j];
      if (queryFilter(query, city)) {
        list.push({ id: city.id, name: `${city.name} (${region.name})` });
      }
    }
  }

  return list;
}

export function sortByString(array, asc, sortBy) {
  return array.sort((a, b) => {
    if (a[sortBy] > b[sortBy]) {
      return asc ? 1 : -1;
    }
    if (a[sortBy] < b[sortBy]) {
      return asc ? -1 : 1;
    }
    return 0;
  });
}
export function sortByNumber(array, asc, sortBy) {
  return array.sort((a, b) => {
    if (asc) return a[sortBy] - b[sortBy];
    return b[sortBy] - a[sortBy];
  });
}
