import ingredients from "../../ingredients.json";
import RecipeForm from "./components/RecipeForm";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold text-center">Recipe app</h1>
      <RecipeForm/>
    </main>
  );
}
