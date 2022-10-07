<template>
<v-sheet>
    <v-app-bar class="elevation-0" densex>
        <v-toolbar-title>
            <div>
                Transactions
            </div>
            <div>
                <v-chip color="primary" label x-small>
                    <h4>
                        <em>Total Amount:&nbsp;</em>
                        {{ AppStore.formatAsCurrency(totalAmount) }}
                    </h4>
                </v-chip>
                <!-- <v-chip color="primary" label x-small>
                    <h4>
                        <em>Grand Total (Completed):&nbsp;</em>
                        {{ AppStore.formatAsCurrency(PrincipalsStore.state.invoicesGrandTotal) }}
                    </h4>
                </v-chip> -->
            </div>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn
            title="Refresh"
            icon
            dense
            rounded
            depressed
            class="mr-2"
            @click="loadInvoicesOrTransactions()"
        >
            <v-icon>mdi-refresh</v-icon>
        </v-btn>

        <v-select
            :items="invoiceStatuses"
            v-model="invoiceStatus"
            label="Status"
            item-text="status"
            item-value="value"
            class="mr-3"
            style="max-width:180px;"
            outlined
            rounded
            hide-details
            dense
        ></v-select>

        <v-text-field
            v-model="dateRangeText"
            label="Posting Date (Y-m-d)"
            hide-details
            readonly
            dense
            outlined
            rounded
            @click.stop="datePickerShown=true"
            class="mr-3"
            style="max-width:230px;"
        ></v-text-field>
        <!-- DATEPICKER -->
        <v-dialog
            ref="datePicker"
            v-model="datePickerShown"
            :return-value.sync="date"
            width="290px"
        >
            <v-date-picker v-model="date" scrollable range>
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color="primary"
                    @click="datePickerShown = false"
                >
                    Cancel
                </v-btn>
                <v-btn
                    text
                    color="primary"
                    @click="$refs.datePicker.save(date);loadInvoicesOrTransactions();"
                >
                    Ok
                </v-btn>
            </v-date-picker>
        </v-dialog>
        <!-- /DATEPICKER -->

        <!-- SEARCH -->
        <v-text-field
            v-model="searchKey"
            label="Search"
            clearable
            hide-details
            dense
            style="max-width:200px;"
            flat
            rounded
            solo-inverted
            class="mr-2"
        ></v-text-field>
        <!-- /SEARCH -->

        <v-btn color="success"
            icon
            title="Export to Excel"
            @click="exportToExcel()"
            :disabled="(searchKey!=null && searchKey!='') ||
                    PrincipalsStore.state.transactions.length < 1
                "
        >
            <v-icon>mdi-file-excel</v-icon>
        </v-btn>

        <v-btn
            icon
            title="Export to PDF"
            @click="exportToPDF()"
            :disabled="(searchKey!=null && searchKey!='') ||
                    PrincipalsStore.state.transactions.length < 1
                "
            color="red"
        >
            <v-icon>mdi-file-pdf-box</v-icon>
        </v-btn>
    </v-app-bar>
    <v-sheet>
        <v-data-table
            :items="PrincipalsStore.state.transactions"
            :headers="tblHeader"
            dense
            :search="searchKey"
            classz="elevation-1"
            id="transactions"
            :loading="PrincipalsStore.state.isInitTransactions"
            disable-sort
        >
            <template v-slot:[`item.updated_at`] = "{ item }">
                <span>
                    {{ item.updated_at.substring(0,10) }}
                </span>
            </template>
            <!-- u3 = amount (haha) -->
            <template v-slot:[`item.u3`] = "{ item }">
                <span background-color="primary">
                    {{ AppStore.formatAsCurrency(parseFloat(item.u3)) }}
                </span>
            </template>
            <template v-slot:[`item.customer_name`] = "{ item }">
                <span class="text-caption">
                    {{ item.customer_name }}
                </span>
            </template>
            <template v-slot:[`item.description`] = "{ item }">
                <span class="text-caption">
                    {{ item.description }}
                </span>
            </template>
        </v-data-table>
    </v-sheet>
</v-sheet>
</template>


<script>
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default {
    // props: ['date','searchKey'],

    data: () => ({
        grandTotal: 0.00,
        // tblFirstPageTotalAmount: 0.00,
        searchKey: '',
        datePickerShown: false,
        date: [new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substr(0, 10)],
        invoiceStatuses: [
            {
                status: "All",
                value: ""
            },
            {
                status: "Completed",
                value: "completed"
            },
            {
                status: "Pending",
                value: "pending"
            }
        ],
        invoiceStatus: "",
    }),

    computed: {
        selectedPrincipalCode() {
            return this.PrincipalsStore.state.selectedPrincipalCode;
        },

        tblHeader() {
            // return this[this.selectedPrincipalCode].state.transactionsTableHeader[0];
            return this.InvoicesStore.state.transactionsTableHeader[0];
        },

        totalAmount() {
            let amount = 0.00;

            if(this.PrincipalsStore.state.transactions.length > 0) {
                this.PrincipalsStore.state.transactions.forEach(e => {
                    amount += parseFloat(e.amount);
                });
            }
            return amount;
        },

        dateRangeText() {
            return this.date.join(' ~ ');
        },
    },

    methods: {
        // exportToExcel() {
        //     const transactionsData = [
        //         [
        //             this.date.toString(),
        //             this.PrincipalsStore.state.transactions
        //         ]
        //     ];

        //     const config = this.PrincipalsStore
        //         .getHeaderAndFormat('transactionsTableHeader');

        //     this.PrincipalsStore.exportToExcel(
        //         config[0].header,
        //         this.PrincipalsStore.generatedDataSubset(
        //             transactionsData,
        //             config[0].format
        //         ),
        //         [7, 8],
        //         `${this.selectedPrincipalCode}_Transactions`
        //     );
        // },

        exportToExcel() {
            console.log(this.PrincipalsStore.state.transactions);
            this.PrincipalsStore.toExcel_simple(
                this.date.toString(),
                this.PrincipalsStore.state.transactions,
                {
                    storeName: 'InvoicesStore',
                    propertyName: 'transactionsTableHeader'
                },
                null, //[7,8],
                `${this.selectedPrincipalCode}_transactions`
            );
        },

        loadInvoicesOrTransactions() {
            this.PrincipalsStore.initTransactions(
                this.selectedPrincipalCode, this.date, this.invoiceStatus
            );
            // this.PrincipalsStore.initInvoices(this.selectedPrincipalCode, this.date);
            // this.PrincipalsStore.initInvoicesGrandTotal(this.invoiceStatus);
        },

        /**
         * Export to PDF (test)
         */
        exportToPDF() {
            const totalAmount = this.AppStore.formatAsCurrency(this.totalAmount);
            const fileName = `${this.selectedPrincipalCode}_transactions`;
            const doc = new jsPDF({orientation:'landscape'});
            const totalPagesExp = '{total_pages_count_string}';

            doc.setFontSize(18);
            doc.text(`Transactions`, 14, 22);
            doc.setFontSize(11);
            doc.setTextColor(100);

            // jsPDF 1.4+ uses getWidth, <1.4 uses .width
            var pageSize = doc.internal.pageSize;
            var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
            var text = doc.splitTextToSize(
                this.dateRangeText,
                pageWidth - 35,
                {}
            );
            doc.text(text, 14, 30)

            doc.setFontSize(8)
            const tempObj = {
                head: [[
                    'Customer Code','Account Name','Sales Invoice',
                    'Item Code','Description','UOM','Quantity','Amount'
                ]]
                ,
                body: this.PrincipalsStore.state.transactions.map(e=>{
                    const { customer_code,customer_name,doc_no,
                        item_code,item_description,uom,quantity,amount,
                        ...rest } = e;
                    return [customer_code,customer_name,doc_no,
                        item_code,item_description,uom,quantity,
                        {content:amount, styles:{halign:'right'}}
                    ];
                }),
                footer: [['Total', '']],
                theme: 'grid',
                startY: 40,
                showHead: 'firstPage',
                headStyles: {fillColor: '#1ea4f7'},
                didDrawPage: function (data) {
                    // Header
                    // doc.setFontSize(20)
                    // doc.setTextColor(40)
                    // // if (base64Img) {
                    // //     doc.addImage(base64Img, 'JPEG', data.settings.margin.left, 15, 10, 10)
                    // // }
                    // doc.text('Report', data.settings.margin.left + 15, 22)

                    // Footer
                    let str = 'Page ' + doc.internal.getNumberOfPages()
                    // Total page number plugin only available in jspdf v1.0+
                    if (typeof doc.putTotalPages === 'function') {
                        str = str + ' of ' + totalPagesExp
                    }
                    doc.setFontSize(10)

                    // jsPDF 1.4+ uses getWidth, <1.4 uses .width
                    var pageSize = doc.internal.pageSize
                    var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
                    doc.text(str, data.settings.margin.left, pageHeight - 10)
                },
            };

            const rowTotalAmount = [
                {content:'Total',colSpan:7,styles:{fontStyle:'bold',fontSize:12}},
                {content:totalAmount,styles:{halign:'right',fontStyle:'bold',fontSize:12}}
            ];
            tempObj.body.push(rowTotalAmount);

            autoTable(doc, tempObj);

            // let finalY = doc.lastAutoTable.finalY; // The y position on the page
            // doc.setFontSize(16);
            // doc.text(20, finalY, "Hello!")

            // Total page number plugin only available in jspdf v1.0+
            if (typeof doc.putTotalPages === 'function') {
                doc.putTotalPages(totalPagesExp);
            }

            doc.save(`${fileName}.pdf`);
        },
    },

    watch: {
        invoiceStatus() {
            this.loadInvoicesOrTransactions();
        }
    },

    created() {
        this.loadInvoicesOrTransactions();
    },

    mounted() {

    }


}
</script>
