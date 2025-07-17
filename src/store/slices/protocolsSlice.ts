/**
 * Protocols State Slice
 * Manages protocol data caching and offline availability
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProtocolStep {
  id: string;
  order: number;
  title: string;
  description: string;
  critical: boolean;
  timeLimit?: number; // in seconds
  references?: string[];
}

export interface ProtocolMedication {
  name: string;
  dose: string;
  route: string;
  frequency?: string;
  contraindications?: string[];
  notes?: string;
}

export interface ProtocolContent {
  causes: string[];
  history: string[];
  exam: string[];
  plan: {
    immediateActions: ProtocolStep[];
    medications: ProtocolMedication[];
    additionalSteps: ProtocolStep[];
  };
}

export interface Protocol {
  id: string;
  title: string;
  category: 'codes' | 'rrts' | 'calls' | 'labs' | 'other';
  severity: 'critical' | 'urgent' | 'moderate' | 'low';
  description: string;
  content: ProtocolContent;
  lastUpdated: number;
  version: string;
  offlineAvailable: boolean;
}

export interface ProtocolUpdate {
  protocolId: string;
  changes: Partial<Protocol>;
  timestamp: number;
  source: 'server' | 'local';
}

interface ProtocolsState {
  protocols: Record<string, Protocol>;
  loading: boolean;
  error: string | null;
  lastFetch: number | null;
  pendingUpdates: ProtocolUpdate[];
  downloadedProtocols: string[]; // IDs of protocols available offline
  syncStatus: 'idle' | 'syncing' | 'error' | 'success';
}

const initialState: ProtocolsState = {
  protocols: {},
  loading: false,
  error: null,
  lastFetch: null,
  pendingUpdates: [],
  downloadedProtocols: [],
  syncStatus: 'idle',
};

const protocolsSlice = createSlice({
  name: 'protocols',
  initialState,
  reducers: {
    // Fetch protocols
    fetchProtocolsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    fetchProtocolsSuccess: (state, action: PayloadAction<Protocol[]>) => {
      state.loading = false;
      state.error = null;
      state.lastFetch = Date.now();
      
      // Convert array to record
      const protocolsRecord: Record<string, Protocol> = {};
      action.payload.forEach(protocol => {
        protocolsRecord[protocol.id] = protocol;
      });
      
      state.protocols = protocolsRecord;
    },
    
    fetchProtocolsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Single protocol operations
    updateProtocol: (state, action: PayloadAction<Protocol>) => {
      state.protocols[action.payload.id] = action.payload;
    },
    
    addProtocol: (state, action: PayloadAction<Protocol>) => {
      state.protocols[action.payload.id] = action.payload;
    },
    
    removeProtocol: (state, action: PayloadAction<string>) => {
      delete state.protocols[action.payload];
      state.downloadedProtocols = state.downloadedProtocols.filter(id => id !== action.payload);
    },
    
    // Offline management
    markProtocolDownloaded: (state, action: PayloadAction<string>) => {
      if (!state.downloadedProtocols.includes(action.payload)) {
        state.downloadedProtocols.push(action.payload);
      }
      
      const protocol = state.protocols[action.payload];
      if (protocol) {
        protocol.offlineAvailable = true;
      }
    },
    
    markProtocolNotDownloaded: (state, action: PayloadAction<string>) => {
      state.downloadedProtocols = state.downloadedProtocols.filter(id => id !== action.payload);
      
      const protocol = state.protocols[action.payload];
      if (protocol) {
        protocol.offlineAvailable = false;
      }
    },
    
    downloadAllCriticalProtocols: (state) => {
      Object.values(state.protocols).forEach(protocol => {
        if (protocol.severity === 'critical' && !state.downloadedProtocols.includes(protocol.id)) {
          state.downloadedProtocols.push(protocol.id);
          protocol.offlineAvailable = true;
        }
      });
    },
    
    // Sync management
    addPendingUpdate: (state, action: PayloadAction<Omit<ProtocolUpdate, 'timestamp'>>) => {
      state.pendingUpdates.push({
        ...action.payload,
        timestamp: Date.now(),
      });
    },
    
    clearPendingUpdates: (state) => {
      state.pendingUpdates = [];
    },
    
    setSyncStatus: (state, action: PayloadAction<ProtocolsState['syncStatus']>) => {
      state.syncStatus = action.payload;
    },
    
    // Batch operations
    setProtocols: (state, action: PayloadAction<Record<string, Protocol>>) => {
      state.protocols = action.payload;
    },
    
    clearProtocols: (state) => {
      state.protocols = {};
      state.downloadedProtocols = [];
      state.pendingUpdates = [];
      state.error = null;
      state.lastFetch = null;
    },
  },
});

export const {
  fetchProtocolsStart,
  fetchProtocolsSuccess,
  fetchProtocolsFailure,
  updateProtocol,
  addProtocol,
  removeProtocol,
  markProtocolDownloaded,
  markProtocolNotDownloaded,
  downloadAllCriticalProtocols,
  addPendingUpdate,
  clearPendingUpdates,
  setSyncStatus,
  setProtocols,
  clearProtocols,
} = protocolsSlice.actions;

export default protocolsSlice.reducer;