import { fetchRoutes, fetchStops, type RouteRaw, type StopRaw } from "@/api";
import { extractAllRoutes } from "@/service/routes";
import { extractAllStops } from "@/service/stops";
import Papa from "papaparse";

export const getAllRoutesData = async () => {
  const [routesRaw, stopsRaw] = await Promise.all([fetchRoutes(), fetchStops()]);

  const parsedRoutes = Papa.parse<RouteRaw>(routesRaw, { header: true, delimiter: ";" });
  const parsedStops = Papa.parse<StopRaw>(stopsRaw, { header: true, delimiter: ";" });

  if (!Array.isArray(parsedRoutes.data)) {
    throw new Error("Invalid routes data");
  }
  if (!Array.isArray(parsedStops.data)) {
    throw new Error("Invalid stops data");
  }

  const routes = extractAllRoutes(parsedRoutes.data);
  const stops = extractAllStops(parsedStops.data);

  return { routes, stops };
};
