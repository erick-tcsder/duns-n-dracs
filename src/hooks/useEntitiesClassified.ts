import { useCallback, useState } from "react";
import { EntitiesService } from "../services/cohere/EntitiesService";

export const useEntitiesClassified = () => {
  const [entitiesClassified, setEntitiesClassified] = useState<Record<string, string[]>>({});
  const [entities, setEntities] = useState<string[]>([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const classifyEntities = useCallback(async (biome: string, count: number) => {
    setLoading(true);
    try {
      const entities = await EntitiesService.generateEntities(biome, count);
      setEntities(entities)
      const classifications = await EntitiesService.classifyEntities(entities);
      const grouped = classifications.reduce((acc, curr) => {
        acc[curr.label] = [... (acc[curr.label] ?? []), curr.input];
        return acc;
      }, {} as Record<string, string[]>);
      setEntitiesClassified(grouped);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    entitiesClassified,
    entities,
    loading,
    error,
    classifyEntities
  };
}