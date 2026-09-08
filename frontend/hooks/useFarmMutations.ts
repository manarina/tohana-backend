// hooks/useFarmMutations.ts
import { useMutation } from '@apollo/client/react';
import {
  CREATE_FARM,
  UPDATE_FARM,
  DELETE_FARM,
  DELETE_ALL_FARMS,
} from '@/lib/graphql/mutations/farms.mutations';
import toast from 'react-hot-toast';

export interface CreateFarmInput {
  name: string;
  description?: string;
  region: string;
  district: string;
  commune: string;
  village: string;
  fokontany?: string;
  gpsLatitude?: string;
  gpsLongitude?: string;
  totalSurface: number;
  phoneNumber?: string;
  farmerGroup?: string;
  isBeneficiary?: boolean;
  programAffiliation?: string;
  notes?: string;
  userId: number;
}

export interface UpdateFarmInput extends Partial<CreateFarmInput> {
  id: number;
}

export function useFarmMutations() {
  const [createFarmMutation, { loading: creating }] = useMutation(CREATE_FARM);
  const [updateFarmMutation, { loading: updating }] = useMutation(UPDATE_FARM);
  const [deleteFarmMutation, { loading: deleting }] = useMutation(DELETE_FARM);
  const [deleteAllFarmsMutation, { loading: deletingAll }] = useMutation(DELETE_ALL_FARMS);

  const createFarm = async (input: CreateFarmInput) => {
    try {
      const response = await createFarmMutation({
        variables: { input },
        // Mettre à jour le cache après la création
        refetchQueries: ['GetFarms', 'GetFarmStats', 'GetFarmsCount'],
      });
      toast.success('Exploitation créée avec succès !');
      return (response.data as { createFarm: unknown }).createFarm;
    } catch (error: any) {
      const message = error.message || 'Erreur lors de la création';
      toast.error(message);
      throw error;
    }
  };

  const updateFarm = async (input: UpdateFarmInput) => {
    try {
      const response = await updateFarmMutation({
        variables: { input },
        refetchQueries: ['GetFarms', 'GetFarm', 'GetFarmStats'],
      });
      toast.success('Exploitation mise à jour avec succès !');
      return (response.data as { updateFarm: unknown }).updateFarm;
    } catch (error: any) {
      const message = error.message || 'Erreur lors de la mise à jour';
      toast.error(message);
      throw error;
    }
  };

  const deleteFarm = async (id: number) => {
    try {
      await deleteFarmMutation({
        variables: { id },
        refetchQueries: ['GetFarms', 'GetFarmStats', 'GetFarmsCount'],
        update: (cache: { evict: (arg0: { id: string; }) => void; gc: () => void; }) => {
          // Mettre à jour le cache manuellement si nécessaire
          cache.evict({ id: `Farm:${id}` });
          cache.gc();
        },
      });
      toast.success('Exploitation supprimée avec succès !');
      return true;
    } catch (error: any) {
      const message = error.message || 'Erreur lors de la suppression';
      toast.error(message);
      throw error;
    }
  };

  const deleteAllFarms = async () => {
    try {
      const response = await deleteAllFarmsMutation({
        refetchQueries: ['GetFarms', 'GetFarmStats', 'GetFarmsCount'],
      });
      const data = response.data as {
        deleteAllFarms: { message: string };
      };
      toast.success(data.deleteAllFarms.message);
      return data.deleteAllFarms;
    } catch (error: any) {
      const message = error.message || 'Erreur lors de la suppression';
      toast.error(message);
      throw error;
    }
  };

  return {
    createFarm,
    updateFarm,
    deleteFarm,
    deleteAllFarms,
    loading: creating || updating || deleting || deletingAll,
  };
}