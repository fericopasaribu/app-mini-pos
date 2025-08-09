"use client";
import { CustomBreadcrumb } from "@/components/CustomBreadCrumb";
import CustomButton from "@/components/CustomButton";
import { CustomCard } from "@/components/CustomCard";
import { CustomDataTableDetail } from "@/components/CustomDataTableDetail";
import { CustomDataTableDialogForm } from "@/components/CustomDataTableDialogForm";
import { CustomError } from "@/components/CustomError";
import { CustomInput } from "@/components/CustomInput";
import { CustomLabel } from "@/components/CustomLabel";
import CustomToast from "@/components/CustomToast";
import { CUSTOM_TEXT } from "@/constants/CustomText";
import { penjualan } from "@/features/penjualan";
import { useDateTime } from "@/hooks/useDateTime";
import { usePenjualan } from "@/hooks/usePenjualan";
import { filterForNumber, formatNumber, formatThousand } from "@/lib/scripts";
import axios from "axios";
import { Ban, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { mutate } from "swr";

export default function AddPenjualanPage() {
  // waktu setup
  const dateTime = useDateTime();

  const dateTimeDisplay = dateTime.format("DD/MM/YY (HH:mm:ss)");
  const dateTimeSave = dateTime.format("YYYY/MM/DD HH:mm:ss");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // kode penjualan setup
  const [kode, setKode] = useState("");

  useEffect(() => {
    const storedKode = localStorage.getItem(CUSTOM_TEXT.storage_kode_penjualan);
    setKode(String(storedKode));
  }, []);

  // search barang setup
  const { data } = usePenjualan();

  const [barang, setBarang] = useState<{
    id: number;
    kode: string;
    nama: string;
    harga: number;
  } | null>(null);

  useEffect(() => {
    removeLocalStorage();

    const loadBarang = () => {
      const stored = localStorage.getItem(CUSTOM_TEXT.storage_selected_barang);
      if (stored) {
        setBarang(JSON.parse(stored));
      }
    };

    loadBarang();

    window.addEventListener(CUSTOM_TEXT.storage_event_barang, loadBarang);

    return () => {
      window.removeEventListener(CUSTOM_TEXT.storage_event_barang, loadBarang);
    };
  }, []);

  // edit penjualan setup
  const [isEdit, setEdit] = useState(false);
  useEffect(() => {
    // handleSetup();
    const checkEdit = () => {
      const isEditData = localStorage.getItem(
        CUSTOM_TEXT.storage_selected_penjualan
      );
      if (isEditData) {
        const parsed = JSON.parse(isEditData);

        setBarang({
          id: parsed.id_barang,
          kode: parsed.kode_barang,
          nama: parsed.nama,
          harga: parsed.harga,
        });

        setForm({
          jumlahRaw: parsed.jumlah,
          jumlahDisplay: formatNumber(parsed.jumlah),
        });

        setEdit(true);
      }
    };

    checkEdit();

    window.addEventListener(
      CUSTOM_TEXT.storage_event_edit_penjualan,
      checkEdit
    );

    return () => {
      window.removeEventListener(
        CUSTOM_TEXT.storage_event_edit_penjualan,
        checkEdit
      );
    };
  }, []);

  // storage remove setup
  const removeLocalStorage = () => {
    if (localStorage.getItem(CUSTOM_TEXT.storage_detail_penjualan)) {
      localStorage.removeItem(CUSTOM_TEXT.storage_detail_penjualan);
    }

    if (localStorage.getItem(CUSTOM_TEXT.storage_selected_barang)) {
      localStorage.removeItem(CUSTOM_TEXT.storage_selected_barang);
    }

    if (localStorage.getItem(CUSTOM_TEXT.storage_selected_penjualan)) {
      localStorage.removeItem(CUSTOM_TEXT.storage_selected_penjualan);
    }
  };

  // form setup
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
    barang: false,
  });

  const [barangError, setBarangError] = useState(false);

  const handleSaveData = async (jumlah: number) => {
    const errorTemp = {
      jumlah: !form.jumlahDisplay.trim(),
      barang: !barang?.kode,
    };

    setError(errorTemp);
    setBarangError(!barang?.kode);

    const isValid = Object.values(errorTemp).every((v) => v === false);

    if (isValid) {
      const formData = new FormData();
      formData.append("kode", kode);
      formData.append("tanggal", dateTimeSave);
      formData.append("jumlah", String(jumlah));
      formData.append("harga", String(barang!.harga));
      formData.append("id_barang", String(barang!.id));

      let response;

      if (isEdit) {
        response = await axios.put(
          `${CUSTOM_TEXT.api_penjualan}/${barang!.id}`,
          formData,
          {
            validateStatus: () => true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.post(`${CUSTOM_TEXT.api_penjualan}`, formData, {
          validateStatus: () => true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      try {
        if (response.data.meta_data.success) {
          CustomToast({
            type: "success",
            source: `Data ${CUSTOM_TEXT.menu_penjualan}`,
            value: `${kode} (${barang?.kode})`,
            message: isEdit ? CUSTOM_TEXT.info_sukses_ubah : CUSTOM_TEXT.info_sukses_simpan,
            duration: CUSTOM_TEXT.time_interval,
          });

          handleSetup();
        } else {
          CustomToast({
            type: "error",
            source: `Data ${CUSTOM_TEXT.menu_penjualan}`,
            value: `${kode} (${barang?.kode})`,
            message: isEdit ? CUSTOM_TEXT.info_gagal_ubah : CUSTOM_TEXT.info_gagal_simpan,
            duration: CUSTOM_TEXT.time_interval,
          });
        }
      } catch {
        CustomToast({
          type: "error",
          source: "Message",
          value: CUSTOM_TEXT.info_error_server,
          message: "",
          duration: CUSTOM_TEXT.time_interval,
        });
      } finally {
        await mutate(`${CUSTOM_TEXT.api_search_barang}/${kode}`);
        await mutate(`${CUSTOM_TEXT.api_penjualan}/${kode}`);
      }
    }
  };

  const handleCancel = () => {
    if (isEdit) {
      handleSetup();
    } else {
      router.back();
    }
  };

  const handleSetup = () => {
    setForm({ jumlahRaw: 0, jumlahDisplay: "" });
    setBarang(null);
    setBarangError(false);
    setEdit(false);
    removeLocalStorage();

    const errorTemp = {
      jumlah: !form.jumlahDisplay.trim(),
      barang: !barang?.kode,
    };

    setError(errorTemp);

    // return Object.values(errorTemp).every((v) => v === false);
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
            {isEdit ? (
              <CustomInput
                value={barang?.kode || ""}
                readOnly
                className="input-text"
              />
            ) : (
              <CustomDataTableDialogForm
                title={`${CUSTOM_TEXT.text_cari_data} ${CUSTOM_TEXT.menu_barang}`}
                text={CUSTOM_TEXT.form_kode_barang}
                kode={barang?.kode || ""}
                isError={barangError}
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
              className={error.jumlah && !isEdit ? "input-error" : "input-text"}
              maxLength={11}
              placeholder={CUSTOM_TEXT.format_isi_angka}
            />
            {error.jumlah && !isEdit && (
              <CustomError
                value={`${CUSTOM_TEXT.form_jumlah_beli} ${CUSTOM_TEXT.info_wajib_isi}`}
              />
            )}
          </div>
        </div>

        <div className="area-form-button">
          <CustomButton
            label={isEdit ? CUSTOM_TEXT.button_ubah : CUSTOM_TEXT.button_simpan}
            className="btn-primary"
            icon={Check}
            onClick={() => handleSaveData(form.jumlahRaw)}
          />

          <CustomButton
            label={CUSTOM_TEXT.button_batal}
            className="btn-secondary"
            icon={Ban}
            onClick={() => handleCancel()}
          />
        </div>

        <div className="table-separator"></div>
        <CustomDataTableDetail columns={penjualan} data={data ?? []} />
      </CustomCard>
    </div>
  );
}
