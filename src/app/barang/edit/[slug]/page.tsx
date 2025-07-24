"use client";
import { CustomBreadcrumb } from "@/components/CustomBreadCrumb";
import CustomButton from "@/components/CustomButton";
import { CustomCard } from "@/components/CustomCard";
import { CustomCombobox } from "@/components/CustomCombox";
import { CustomError } from "@/components/CustomError";
import CustomImageUpload from "@/components/CustomImageUpload";
import { CustomInput } from "@/components/CustomInput";
import { CustomLabel } from "@/components/CustomLabel";
import CustomLoading from "@/components/CustomLoading";
import CustomToast from "@/components/CustomToast";
import { CUSTOM_TEXT } from "@/constants/CustomText";
import {
  filterForCode,
  filterForNumber,
  filterForNumberTextPlus,
  formatNumber,
  formatThousand,
} from "@/lib/scripts";
import axios from "axios";
import { Ban, Check } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function EditBarangPage() {
  const params = useParams();
  const slug = Number(params.slug);

  const router = useRouter();

  const [form, setForm] = useState<{
    kode: string;
    nama: string;
    hargaRaw: number;
    hargaDisplay: string;
    foto: File | null;
    id_satuan: number;
  }>({
    kode: "",
    nama: "",
    hargaRaw: 0,
    hargaDisplay: "",
    foto: null,
    id_satuan: 0,
  });

  const [error, setError] = useState({
    kode: false,
    nama: false,
    harga: false,
    id_satuan: false,
  });

  const [errorRedudance, setErrorRedudance] = useState(false);

  const [satuanId, setSatuanId] = useState<number | null>(null);
  const [satuanError, setSatuanError] = useState(false);
  const [oldFoto, setOldFoto] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const response = await axios.get(`${CUSTOM_TEXT.api_barang}/${slug}`, {
      validateStatus: () => true,
    });

    try {
      if (response.data.meta_data.success) {
        setForm({
          kode: response.data.result.kode ?? "",
          nama: response.data.result.nama ?? "",
          hargaDisplay: formatNumber(Number(response.data.result.harga)) ?? "",
          hargaRaw: response.data.result.harga ?? "",
          id_satuan: setSatuanId(Number(response.data.result.id_satuan)) ?? 0,
          foto: response.data.result.foto ?? null,
        });
        setOldFoto(response.data.result.foto ?? null);
        setIsLoading(false);
      } else {
        router.replace("/404");
      }
    } catch {}
  }, [slug, router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEditData = async (
    kode: string,
    nama: string,
    harga: number,
    foto: File | null | string
  ) => {
    const errorTemp = {
      kode: !form.kode.trim(),
      nama: !form.nama.trim(),
      harga: !form.hargaDisplay.trim(),
      id_satuan: !satuanId,
    };

    setError(errorTemp);
    setSatuanError(!satuanId);

    const isValid = Object.values(errorTemp).every((v) => v === false);

    if (isValid) {
      const formData = new FormData();
      formData.append("kode", kode);
      formData.append("nama", nama);
      formData.append("harga", String(harga));
      formData.append("id_satuan", String(satuanId));
      if (foto && typeof foto !== "string") {
        formData.append("foto", foto);
      }
      formData.append("old_foto", oldFoto);

      const response = await axios.put(
        `${CUSTOM_TEXT.api_barang}/${slug}`,
        formData,
        {
          validateStatus: () => true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      try {
        if (response.data.meta_data.success) {
          CustomToast({
            type: "success",
            source: `Data ${CUSTOM_TEXT.menu_barang}`,
            value: nama,
            message: CUSTOM_TEXT.info_sukses_ubah,
            duration: CUSTOM_TEXT.time_interval,
          });

          setErrorRedudance(false);
        } else {
          CustomToast({
            type: "error",
            source: `Data ${CUSTOM_TEXT.menu_barang}`,
            value: nama,
            message: CUSTOM_TEXT.info_gagal_ubah,
            duration: CUSTOM_TEXT.time_interval,
          });

          setErrorRedudance(true);
        }
      } catch {
        CustomToast({
          type: "error",
          source: "Message",
          value: CUSTOM_TEXT.info_error_server,
          message: "",
          duration: CUSTOM_TEXT.time_interval,
        });

        setErrorRedudance(false);
      }
    }
  };

  return (
    <div className="area-content">
      <CustomBreadcrumb />
      <CustomCard
        title={`${CUSTOM_TEXT.text_ubah_data} ${CUSTOM_TEXT.menu_barang}`}>
        <CustomLoading isLoading={isLoading}>
          <div className="area-upload">
            <CustomImageUpload
              onChange={(file) => setForm({ ...form, foto: file })}
              initialUrl={
                typeof form.foto === "string" && form.foto
                  ? `${CUSTOM_TEXT.api_file}/${form.foto}`
                  : undefined
              }
            />
            <div className="mt-[-10px]">
              {CUSTOM_TEXT.info_file_label_format} :{" "}
              <strong>{CUSTOM_TEXT.info_file_gambar_format}</strong>
            </div>
            <div>
              {CUSTOM_TEXT.info_file_label_size} :{" "}
              <strong>{CUSTOM_TEXT.info_file_gambar_size}</strong>
            </div>
          </div>
          <div className="area-form-content">
            <div>
              <CustomLabel value={CUSTOM_TEXT.form_kode_barang} required />
              <CustomInput
                value={form.kode}
                onChange={(value) => {
                  const result = filterForCode(value);
                  setForm({ ...form, kode: result });
                }}
                className={
                  error.kode || errorRedudance ? "input-error" : "input-text"
                }
                maxLength={20}
                placeholder={CUSTOM_TEXT.format_isi_kode}
              />
              {error.kode ? (
                <CustomError
                  value={`${CUSTOM_TEXT.form_kode_barang} ${CUSTOM_TEXT.info_wajib_isi}`}
                />
              ) : errorRedudance ? (
                <CustomError
                  value={`${CUSTOM_TEXT.form_kode_barang} ${CUSTOM_TEXT.info_error_redudansi}`}
                />
              ) : (
                ""
              )}
            </div>

            <div>
              <CustomLabel value={CUSTOM_TEXT.form_nama_barang} required />
              <CustomInput
                value={form.nama}
                onChange={(value) => {
                  const result = filterForNumberTextPlus(value);
                  setForm({ ...form, nama: result });
                }}
                className={error.nama ? "input-error" : "input-text"}
                maxLength={100}
                placeholder={CUSTOM_TEXT.format_isi_angka_text_plus}
              />
              {error.nama && (
                <CustomError
                  value={`${CUSTOM_TEXT.form_nama_barang} ${CUSTOM_TEXT.info_wajib_isi}`}
                />
              )}
            </div>

            <div>
              <CustomLabel value={CUSTOM_TEXT.form_harga_barang} required />
              <CustomInput
                value={String(form.hargaDisplay)}
                onChange={(value) => {
                  const raw = filterForNumber(value);
                  const display = formatThousand(value);
                  setForm({
                    ...form,
                    hargaRaw: Number(raw),
                    hargaDisplay: display,
                  });
                }}
                className={error.harga ? "input-error" : "input-text"}
                maxLength={11}
                placeholder={CUSTOM_TEXT.format_isi_angka}
              />
              {error.harga && (
                <CustomError
                  value={`${CUSTOM_TEXT.form_harga_barang} ${CUSTOM_TEXT.info_wajib_isi}`}
                />
              )}
            </div>

            <div>
              <CustomLabel value={CUSTOM_TEXT.form_satuan_barang} required />
              <div>
                <CustomCombobox
                  text={CUSTOM_TEXT.form_satuan_barang}
                  value={satuanId}
                  api={CUSTOM_TEXT.api_satuan}
                  onChange={(id) => {
                    setSatuanId(id);
                  }}
                  isError={satuanError}
                />
              </div>
            </div>
          </div>

          <div className="area-form-button">
            <CustomButton
              label={CUSTOM_TEXT.button_ubah}
              className="btn-primary"
              icon={Check}
              onClick={() =>
                handleEditData(form.kode, form.nama, form.hargaRaw, form.foto)
              }
            />

            <CustomButton
              label={CUSTOM_TEXT.button_batal}
              className="btn-secondary"
              icon={Ban}
              onClick={() => router.back()}
            />
          </div>
        </CustomLoading>
      </CustomCard>
    </div>
  );
}
