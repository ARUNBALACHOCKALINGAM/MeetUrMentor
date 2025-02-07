import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../data/store/store"; // Import AppDispatch type

export const useAppDispatch = () => useDispatch<AppDispatch>();