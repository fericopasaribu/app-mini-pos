"use client";
import { CustomBreadcrumb } from "@/components/CustomBreadCrumb";
import CustomButton from "@/components/CustomButton";
import { CustomCard } from "@/components/CustomCard";
import { CustomDataTableDialogForm } from "@/components/CustomDataTableDialogForm";
import { CustomError } from "@/components/CustomError";
import { CustomInput } from "@/components/CustomInput";
import { CustomLabel } from "@/components/CustomLabel";
import CustomToast from "@/components/CustomToast";
import { CUSTOM_TEXT } from "@/constants/CustomText";
import { useDateTime } from "@/hooks/useDateTime";
import { filterForNumber, formatNumber, formatThousand } from "@/lib/scripts";
import axios from "axios";
import { Ban, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { mutate } from "swr";

export default function AddPenjualanPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dateTime = useDateTime();

  const dateTimeDisplay = dateTime.format("DD/MM/YY (HH:mm:ss)");
  const dateTimeSave = dateTime.format("YYYY/MM/DD HH:mm:ss");

  const [kode, setKode] = useState("");

  useEffect(() => {
    const storedKode = localStorage.getItem(CUSTOM_TEXT.storage_kode_penjualan);
    setKode(String(storedKode));
  }, []);

  const [barang, setBarang] = useState<{
    id: number;
    kode: string;
    nama: string;
    harga: number;
  } | null>(null);

  useEffect(() => {
    if (localStorage.getItem(CUSTOM_TEXT.storage_selected_barang)) {
      localStorage.removeItem(CUSTOM_TEXT.storage_selected_barang);
    }

    const loadBarang = () => {
      const stored = localStorage.getItem(CUSTOM_TEXT.storage_selected_barang);
      if (stored) {
        setBarang(JSON.parse(stored));
      }
    };

    loadBarang();

    window.addEventListener("barang-selected", loadBarang);

    return () => {
      window.removeEventListener("barang-selected", loadBarang);
    };
  }, []);

  const router = useRouter();

  const [form, setForm] = useState<{
    jumlahRaw: number;
    jumlahDisplay: string;
  }>({
    jumlahRaw: 0,
    jumlahDisplay: "",
  });

  const [error, setError] = useState({
    jumlah: false,
  });

  // const [errorRedudance, setErrorRedudance] = useState(false);

  const handleSaveData = async (jumlah: number) => {
    const errorTemp = {
      jumlah: !form.jumlahDisplay.trim(),
    };

    setError(errorTemp);

    const isValid = Object.values(errorTemp).every((v) => v === false);

    if (isValid) {
      const formData = new FormData();
      formData.append("kode", kode);
      formData.append("tanggal", dateTimeSave);
      formData.append("jumlah", String(jumlah));
      formData.append("harga", String(barang!.harga));
      formData.append("id_barang", String(barang!.id));

      const response = await axios.post(
        `${CUSTOM_TEXT.api_penjualan}`,
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
            source: `Data ${CUSTOM_TEXT.menu_penjualan}`,
            value: "",
            message: CUSTOM_TEXT.info_sukses_simpan,
            duration: CUSTOM_TEXT.time_interval,
          });

          setForm({ jumlahRaw: 0, jumlahDisplay: "" });
          // setErrorRedudance(false);
          if (localStorage.getItem(CUSTOM_TEXT.storage_selected_barang)) {
            localStorage.removeItem(CUSTOM_TEXT.storage_selected_barang);
          }

          setBarang(null);
        } else {
          CustomToast({
            type: "error",
            source: `Data ${CUSTOM_TEXT.menu_penjualan}`,
            value: "",
            message: CUSTOM_TEXT.info_gagal_simpan,
            duration: CUSTOM_TEXT.time_interval,
          });

          // setErrorRedudance(true);
        }
      } catch {
        CustomToast({
          type: "error",
          source: "Message",
          value: CUSTOM_TEXT.info_error_server,
          message: "",
          duration: CUSTOM_TEXT.time_interval,
        });

        // setErrorRedudance(false);
      } finally {
        await mutate(`${CUSTOM_TEXT.api_search_barang}/${kode}`);
      }
    }
  };

  return (
    <div className="area-content">
      <CustomBreadcrumb />
      <CustomCard
        title={`${CUSTOM_TEXT.text_tambah_data} ${CUSTOM_TEXT.menu_penjualan}`}>
        <div className="area-form-content">
          <div>
            <CustomLabel value={CUSTOM_TEXT.form_kode_penjualan} />
            <CustomInput value={kode} readOnly className="input-text" />
          </div>

          <div>
            <CustomLabel value={CUSTOM_TEXT.form_tanggal_penjualan} />
            <div
              className={`flex items-center border rounded-md px-3 py-0 bg-gray-100 text-[var(--color-error)] input-text`}>
              {mounted ? dateTimeDisplay : null}
            </div>
          </div>

          <div>
            <CustomLabel value={CUSTOM_TEXT.form_kode_barang} required />
            <CustomDataTableDialogForm
              title={`${CUSTOM_TEXT.text_cari_data} ${CUSTOM_TEXT.menu_barang}`}
              kode={barang?.kode || ""}
            />
            {error.jumlah && (
              <CustomError
                value={`${CUSTOM_TEXT.form_kode_barang} ${CUSTOM_TEXT.info_wajib_pilih}`}
              />
            )}
          </div>

          <div>
            <CustomLabel value={CUSTOM_TEXT.form_nama_barang} />
            <CustomInput
              value={barang?.nama || ""}
              readOnly
              className="input-text"
            />
          </div>

          <div>
            <CustomLabel value={CUSTOM_TEXT.form_harga_barang} required />
            <CustomInput
              value={
                barang?.harga != null ? formatNumber(Number(barang.harga)) : ""
              }
              readOnly
              className="input-text"
            />
          </div>

          <div>
            <CustomLabel value={CUSTOM_TEXT.form_jumlah_beli} />
            <CustomInput
              value={String(form.jumlahDisplay)}
              onChange={(value) => {
                const raw = filterForNumber(value);
                const display = formatThousand(value);
                setForm({
                  ...form,
                  jumlahRaw: Number(raw),
                  jumlahDisplay: display,
                });
              }}
              className={error.jumlah ? "input-error" : "input-text"}
              maxLength={11}
              placeholder={CUSTOM_TEXT.format_isi_angka}
            />
            {error.jumlah && (
              <CustomError
                value={`${CUSTOM_TEXT.form_jumlah_beli} ${CUSTOM_TEXT.info_wajib_isi}`}
              />
            )}
          </div>
        </div>

        <div className="area-form-button">
          <CustomButton
            label={CUSTOM_TEXT.button_simpan}
            className="btn-primary"
            icon={Check}
            onClick={() => handleSaveData(form.jumlahRaw)}
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
