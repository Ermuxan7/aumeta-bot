import FormInput from "@/app/components/form-input/FormInput";
import BackButton from "@/components/ui/back-button";

const Project = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mt-8 px-4 sm:px-8 md:px-12">
      <BackButton />
      <h2 className="text-2xl md:text-3xl mb-4">Project</h2>
      <div className="space-y-4 ">
        <FormInput
          legend="Aymaq"
          type="text"
          placeholder="Qaraqalpaqstan, Tashkent, Samarqand, Nawayı, Xarezm h.t.b"
        />
        <FormInput
          legend="Lawazım"
          type="text"
          placeholder="Dizayner, menejer, esapshı h.t.b"
        />
        <FormInput
          legend="Mekeme"
          type="text"
          placeholder="Bizler Group, ООО Ромашка, Delivery Express h.t.b"
        />
        <FormInput
          legend="Mánzil"
          type="text"
          placeholder="Москва, Tashkent, Ақтау, Бишкек ул. h.t.b"
        />
        <FormInput
          legend="Talaplar"
          as="textarea"
          placeholder="Tájiriybe 2 jıl, Excel biliw, Inglis tili B2"
        />
        <FormInput
          legend="Májburiyatlar"
          type="textarea"
          placeholder="Klientlermen islew, esabatlar, satıw kerek h.t.b"
        />
        <FormInput
          legend="Jumıs waqıtı "
          type="text"
          placeholder="9:00 - 18:00, erkin grafik, 5/2"
        />
        <FormInput
          legend="Aylıq"
          type="text"
          placeholder="Kelisimli, $800, 7 mln swm h.t.b"
        />
        <FormInput
          legend="Baylanıs"
          type="text"
          placeholder="998901234567, ab@email.com, @hr"
        />
        <FormInput
          legend="Qosımsha"
          type="textarea"
          placeholder="Bonuslar, shárayatlar h.t.b qolaylıqlar"
        />
      </div>
    </div>
  );
};

export default Project;
