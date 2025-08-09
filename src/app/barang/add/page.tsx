"use client";
import { CustomBreadcrumb } from "@/components/CustomBreadCrumb";
import CustomButton from "@/components/CustomButton";
import { CustomCard } from "@/components/CustomCard";
import { CustomCombobox } from "@/components/CustomCombox";
import { CustomError } from "@/components/CustomError";
import CustomImageUpload from "@/components/CustomImageUpload";
import { CustomInput } from "@/components/CustomInput";
import { CustomLabel } from "@/components/CustomLabel";
import CustomToast from "@/components/CustomToast";
import { CUSTOM_TEXT } from "@/constants/CustomText";
import {
  filterForCode,
  filterForNumber,
  filterForNumberTextPlus,
  formatThousand,
} from "@/lib/scripts";
import axios from "axios";
import { Ban, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddBarangPage() {
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
    // id_satuan: false,
  });

  const [errorRedudance, setErrorRedudance] = useState(false);
  const [resetImage, setResetImage] = useState("init");

  const [satuanId, setSatuanId] = useState<number | null>(null);
  const [satuanError, setSatuanError] = useState(false);

  const handleSaveData = async (
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

      const response = await axios.post(`${CUSTOM_TEXT.api_barang}`, formData, {
        validateStatus: () => true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      try {
        if (response.data.meta_data.success) {
          CustomToast({
            type: "success",
            source: `Data ${CUSTOM_TEXT.menu_barang}`,
            value: nama,
            message: CUSTOM_TEXT.info_sukses_simpan,
            duration: CUSTOM_TEXT.time_interval,
          });

          setForm({
            kode: "",
            nama: "",
            hargaRaw: 0,
            hargaDisplay: "",
            id_satuan: 0,
            foto: null,
          });
          setSatuanId(null);
          setSatuanError(false);
          setErrorRedudance(false);
          setResetImage(Date.now().toString());
        } else {
          CustomToast({
            type: "error",
            source: `Data ${CUSTOM_TEXT.menu_barang}`,
            value: nama,
            message: CUSTOM_TEXT.info_gagal_simpan,
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
        title={`${CUSTOM_TEXT.text_tambah_data} ${CUSTOM_TEXT.menu_barang}`}>
        <div className="area-upload">
          <CustomImageUpload
            onChange={(file) => setForm({ ...form, foto: file })}
            resetKey={resetImage}
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
            label={CUSTOM_TEXT.button_simpan}
            className="btn-primary"
            icon={Check}
            onClick={() =>
              handleSaveData(form.kode, form.nama, form.hargaRaw, form.foto)
            }
          />

          <CustomButton
            label={CUSTOM_TEXT.button_batal}
            className="btn-secondary"
            icon={Ban}
            onClick={() => router.back()}
          />
        </div>
      </CustomCard>
    </div>
  );
}
