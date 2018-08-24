function fetchNestedObj(object) {
  if (object) {
    return Object.keys(object)
      .reduce((accumulator, key) => {
        if (typeof object[key] !== 'object') {
          accumulator[key] = object[key];
          return accumulator;
        }
        return {
          ...accumulator,
          ...fetchNestedObj(object[key])
        }
      }, {});
  }
  return null;
}

// Part of calculation distance function
function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

// Minimize  the distance number length
function round(value, place) {
  const multiplier = Math.pow(10, place || 0);
  return (Math.round(value * multiplier) / multiplier);
}

// Calculate the distance in Mile
function calculateDistance(lat1, lon1, lat2, lon2) {
  const radius = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const firtsValue = (Math.sin(dLat / 2) * Math.sin(dLat / 2));
  const secondValue = (Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2))) * (Math.sin(dLon / 2) * Math.sin(dLon / 2));
  const a = firtsValue + secondValue;
  const c = (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))) * 0.621371;
  const distance = radius * c; // Distance in km
  return round(distance, 3);
}

// This function will get user postcode latitude, longitude and organization latitude longitude
// then will use calculateDistance function to calculate the distance by mile then return list
// of organizations data with distance between the organization and user address
function geoNear(lat, long, latLong) {
  const total = [];
  for (let i = 0; i < latLong.length; i += 1) {
    const { data } = latLong[i];
    if (latLong[i].lat && latLong[i].long) {
      total.push({ distance: calculateDistance(lat, long, latLong[i].lat, latLong[i].long), success: true, data })
    } else {
      total.push({
        distance: calculateDistance(lat, long, latLong[i].lat, latLong[i].long),
        success: true,
        message: 'Dose not have postcode or postcode is incorrect',
        data
      })
    }
  }
  return total.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
}


function fetchNested(obj) {
  return obj.branch.map(itemObj => {
    let branches;
    const {
      org_name,
      website
    } = obj;
    const {
      org_id,
      borough,
      project,
      clients,
      tag
    } = itemObj;

    branches = ({
      org_name,
      website,
      org_id,
      borough,
      project,
      clients,
      tag
    });

    itemObj.address.map(org => {
      const {
        branch_id,
        area,
        postcode,
        telephone,
        email_address
      } = org
      branches = {
        ...branches,
        branch_id,
        area,
        postcode,
        telephone,
        email_address
      }

      // Get location key value
      org.location.map(locaitem => {
        const {
          address_id,
          lat,
          long
        } = locaitem;
        branches = {
          ...branches,
          address_id,
          lat,
          long
        }
      })
    })

    // Get service key value
    itemObj.service.map(serviceItem => {
      const {
        service_days,
        service,
        process,
        categories
      } = serviceItem;
      branches = {
        ...branches,
        service_days,
        service,
        process
      };

      categories.map(cat => {
        const {
          service_id,
          cat_name
        } = cat

        branches = {
          ...branches,
          service_id,
          cat_name
        }
      })
    })
    return branches;
  })
}



export default {
  fetchNestedObj,
  fetchNested,
  geoNear
};
