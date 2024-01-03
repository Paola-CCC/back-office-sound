

const handleCheckboxChange = (options : any) => {
      
    // Crée un Set à partir d'un tableau de nombre;
    let allValue = options.map((option : any) => option.value);
    const uniqueValues = new Set(allValue);

    // Utilise la méthode 'filter' pour garder uniquement les options avec des valeurs uniques
    const optionsWithoutDuplicates: any = options.filter((option :any) => {
      // Si la valeur de l'option est présente dans le Set, cela signifie qu'elle a déjà été rencontrée
      // et nous devons la filtrer (retourner false)
      if (uniqueValues.has(option.value)) {
        uniqueValues.delete(option.value); // Supprime la valeur du Set pour éviter les doublons futurs
        return true; // Garde l'option dans le tableau résultant
      }
      return false; // Filtre les doublons
    });

    return optionsWithoutDuplicates;

};


export { handleCheckboxChange };