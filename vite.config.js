import { defineConfig } from 'vite';
import path from "path"
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
		  "src": path.resolve(__dirname, "./src"),
		},
	  },
});
