export interface Branch {
  id: string;
  name: string;
  url: string;
  address: string;
  city: string;
  pincode: string;
  state: string;
  timing: string;
  lat: number;
  lng: number;
}

export interface StateSummary {
  state: string;
  count: number;
  capitalCity: string;
  lat: number;
  lng: number;
  branches: Branch[];
}

// Live dataset populated dynamically via Branch Master API
export const BRANCHES_DATA: Branch[] = [];

// Coordinates for state capital centers on map
export const STATE_COORDINATES: Record<string, { lat: number; lng: number; capital: string }> = {
  'Tamil Nadu': { lat: 13.0827, lng: 80.2707, capital: 'Chennai' },
  'Karnataka': { lat: 12.9716, lng: 77.5946, capital: 'Bengaluru' },
  'Telangana': { lat: 17.3850, lng: 78.4867, capital: 'Hyderabad' },
  'Maharashtra': { lat: 19.0760, lng: 72.8777, capital: 'Mumbai' },
  'Kerala': { lat: 9.9312, lng: 76.2673, capital: 'Kochi' },
  'Uttar Pradesh': { lat: 26.8467, lng: 80.9462, capital: 'Lucknow' },
  'Andhra Pradesh': { lat: 16.5062, lng: 80.6480, capital: 'Vijayawada' },
  'West Bengal': { lat: 22.5726, lng: 88.3639, capital: 'Kolkata' },
  'Rajasthan': { lat: 26.9124, lng: 75.7873, capital: 'Jaipur' },
  'Haryana': { lat: 28.4595, lng: 77.0266, capital: 'Gurugram' },
  'Delhi': { lat: 28.6139, lng: 77.2090, capital: 'New Delhi' },
  'Gujarat': { lat: 23.0225, lng: 72.5714, capital: 'Ahmedabad' },
  'Madhya Pradesh': { lat: 23.2599, lng: 77.4126, capital: 'Bhopal' },
  'Odisha': { lat: 20.2961, lng: 85.8245, capital: 'Bhubaneswar' },
  'Uttarakhand': { lat: 30.3165, lng: 78.0322, capital: 'Dehradun' },
  'Bihar': { lat: 25.5941, lng: 85.1376, capital: 'Patna' },
  'Chhattisgarh': { lat: 21.2514, lng: 81.6296, capital: 'Raipur' },
  'Puducherry': { lat: 11.9416, lng: 79.8083, capital: 'Puducherry' },
  'Punjab': { lat: 30.7333, lng: 76.7794, capital: 'Chandigarh' },
};

export const CITY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  'Shivamogga': { lat: 13.9299, lng: 75.5681 },
  'Shimoga': { lat: 13.9299, lng: 75.5681 },
  'Bengaluru': { lat: 12.9716, lng: 77.5946 },
  'Bangalore': { lat: 12.9716, lng: 77.5946 },
  'Panvel': { lat: 18.9894, lng: 73.1175 },
  'Navi Mumbai': { lat: 18.9894, lng: 73.1175 },
  'Kolhapur': { lat: 16.7050, lng: 74.2433 },
  'Pune': { lat: 18.5204, lng: 73.8567 },
  'Wagholi': { lat: 18.5793, lng: 73.9806 },
  'Thane': { lat: 19.2183, lng: 72.9781 },
  'Chhatrapati Sambhajinagar': { lat: 19.8762, lng: 75.3433 },
  'Aurangabad': { lat: 19.8762, lng: 75.3433 },
  'Palghar': { lat: 19.4172, lng: 72.8222 },
  'Nagpur': { lat: 21.1458, lng: 79.1122 },
  'Mumbai': { lat: 19.0760, lng: 72.8777 },
  'Coimbatore': { lat: 11.0168, lng: 76.9558 },
  'Chennai': { lat: 13.0827, lng: 80.2707 },
  'Madurai': { lat: 9.9252, lng: 78.1198 },
  'Salem': { lat: 11.6643, lng: 78.1460 },
  'Tirunelveli': { lat: 8.7139, lng: 77.7567 },
  'Tiruchirappalli': { lat: 10.7905, lng: 78.7047 },
  'Vellore': { lat: 12.9165, lng: 79.1325 },
  'Ernakulam': { lat: 9.9816, lng: 76.2999 },
  'Kochi': { lat: 9.9312, lng: 76.2673 },
  'Thrissur': { lat: 10.5276, lng: 76.2144 },
  'Thiruvananthapuram': { lat: 8.5241, lng: 76.9366 },
  'Kozhikode': { lat: 11.2588, lng: 75.7804 },
  'Mysuru': { lat: 12.2958, lng: 76.6394 },
  'Hubballi': { lat: 15.3647, lng: 75.1240 },
  'Belagavi': { lat: 15.8497, lng: 74.4977 },
  'Davanagere': { lat: 14.4644, lng: 75.9218 },
  'Hyderabad': { lat: 17.3850, lng: 78.4867 },
  'Nizamabad': { lat: 18.6725, lng: 78.0941 },
  'Warangal': { lat: 17.9689, lng: 79.5941 },
  'Vijayawada': { lat: 16.5062, lng: 80.6480 },
  'Visakhapatnam': { lat: 17.6868, lng: 83.2185 },
  'Rajahmundry': { lat: 17.0005, lng: 81.8040 },
  'Guntur': { lat: 16.3067, lng: 80.4365 },
  'Noida': { lat: 28.5355, lng: 77.3910 },
  'Ghaziabad': { lat: 28.6692, lng: 77.4538 },
  'Lucknow': { lat: 26.8467, lng: 80.9462 },
  'Varanasi': { lat: 25.3176, lng: 82.9739 },
  'Delhi': { lat: 28.6139, lng: 77.2090 },
  'Jaipur': { lat: 26.9124, lng: 75.7873 },
  'Kota': { lat: 25.2138, lng: 75.8648 },
  'Kolkata': { lat: 22.5726, lng: 88.3639 },
  'Barasat': { lat: 22.7229, lng: 88.4807 },
  'Bhubaneswar': { lat: 20.2961, lng: 85.8245 },
  'Indore': { lat: 22.7196, lng: 75.8577 },
  'Mohali': { lat: 30.7046, lng: 76.7179 },
  'Faridabad': { lat: 28.4089, lng: 77.3178 },
};

export function resolveBranchCoordinates(b: {
  branchCode?: string;
  name?: string;
  location?: string;
  city?: string;
  state?: string;
}): { lat: number; lng: number } {
  const code = (b.branchCode || '').toLowerCase();
  const name = (b.name || '').toLowerCase();
  const loc = (b.location || b.city || '').toLowerCase();

  const cityKey = Object.keys(CITY_COORDINATES).find(
    (c) => c.toLowerCase() === loc || loc.includes(c.toLowerCase()) || name.includes(c.toLowerCase())
  );
  if (cityKey && CITY_COORDINATES[cityKey]) {
    return CITY_COORDINATES[cityKey];
  }

  const stateMeta = STATE_COORDINATES[b.state || ''] || { lat: 20.5937, lng: 78.9629 };
  return { lat: stateMeta.lat, lng: stateMeta.lng };
}

/**
 * Accessor service (Strapi CMS ready)
 */
export async function getAllBranches(): Promise<Branch[]> {
  return BRANCHES_DATA;
}

export function getStateSummaries(): StateSummary[] {
  const map = new Map<string, Branch[]>();

  BRANCHES_DATA.forEach((branch) => {
    const list = map.get(branch.state) || [];
    list.push(branch);
    map.set(branch.state, list);
  });

  const summaries: StateSummary[] = [];

  map.forEach((branches, state) => {
    const count = branches.length;
    const meta = STATE_COORDINATES[state] || { lat: 20.5937, lng: 78.9629, capital: state };
    summaries.push({
      state,
      count,
      capitalCity: meta.capital,
      lat: meta.lat,
      lng: meta.lng,
      branches,
    });
  });

  return summaries.sort((a, b) => b.count - a.count);
}

export function getUniqueStates(): string[] {
  const states = Array.from(new Set(BRANCHES_DATA.map((b) => b.state)));
  return states.sort();
}

export function getCitiesByState(state: string): string[] {
  const cities = Array.from(
    new Set(
      BRANCHES_DATA.filter((b) => b.state.toLowerCase() === state.toLowerCase()).map(
        (b) => b.city
      )
    )
  );
  return cities.sort();
}

export function getBranchesByState(state: string): Branch[] {
  return BRANCHES_DATA.filter((b) => b.state.toLowerCase() === state.toLowerCase());
}

export function getStateCitiesMap(): Record<string, string[]> {
  const map: Record<string, string[]> = {};
  BRANCHES_DATA.forEach((b) => {
    if (!map[b.state]) {
      map[b.state] = [];
    }
    if (!map[b.state].includes(b.city)) {
      map[b.state].push(b.city);
    }
  });

  Object.keys(map).forEach((st) => {
    map[st].sort();
  });

  return map;
}
