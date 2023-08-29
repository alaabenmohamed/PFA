import Select from 'react-select';

type SelectBoutiquetype = {
  setNomBoutique: Function;
  setidBoutique: Function;
  listeBoutiques: any;
};
function SelectEnseignant({
  setidBoutique,
  setNomBoutique,
  listeBoutiques
}: SelectBoutiquetype) {
  return (
    <div className="select_cl">
      <Select
        placeholder="Sélectionnez un Enseignant"
        onChange={(e: any) => {
          setNomBoutique(e.label); /*Pour récupérer le nom du clt*/
          setidBoutique(e.value);
        }}
        options={listeBoutiques}
      />
    </div>
  );
}

export default SelectEnseignant;
