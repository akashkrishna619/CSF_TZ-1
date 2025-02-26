frappe.ui.form.on("Payroll Entry", {
    setup: function(frm) {
        frm.trigger("create_update_slips_btn");
        frm.trigger("create_print_btn");
        frm.trigger("create_journal_entry_btn");
        
    },
    refresh:function(frm) {
        frm.trigger("create_update_slips_btn");
        frm.trigger("create_print_btn");
        frm.trigger("create_journal_entry_btn");
    },
    create_update_slips_btn: function (frm) {
        if (frm.doc.docstatus != 1) {
            return
        }
        frm.add_custom_button(__("Update Salary Slips"), function() {
            frappe.call({
                method: 'csf_tz.csftz_hooks.payroll.update_slips',
                args: {
                    payroll_entry: frm.doc.name,
                },
                callback: function(r) {
                    if (r.message) {
                        console.log(r.message);
                    }
                }
            });
        });
    },
    create_print_btn: function (frm) {
        if (frm.doc.docstatus != 1) {
            return
        }
        frm.add_custom_button(__("Print Salary Slips"), function() {
            frappe.call({
                method: 'csf_tz.csftz_hooks.payroll.print_slips',
                args: {
                    payroll_entry: frm.doc.name,
                },
                // callback: function(r) {
                //     if (r.message) {
                //         frm.reload_doc();
                //     }
                // }
            });
        });
    },
    create_journal_entry_btn: function (frm) {
        if (frm.doc.docstatus != 1 || frm.doc.salary_slips_submitted == 1) {
            return;
        }
        frm.add_custom_button(__("Create Journal Entry"), function () {
            frappe.call({
                method: 'csf_tz.csftz_hooks.payroll.create_journal_entry',
                args: {
                    payroll_entry: frm.doc.name,
                },
                // callback: function(r) {
                //     if (r.message) {
                //         frm.reload_doc();
                //     }
                // }
            });
        });
    },
});
