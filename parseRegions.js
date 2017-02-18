export default function parseRegions(regionList) {
  const items = regionList.map((item) => {
    const ids = item.id.split('-');
    return { regionId: ids[0], cityId: ids[1], name: item.region };
  });

  return items;
}
