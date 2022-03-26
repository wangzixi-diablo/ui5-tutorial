CLASS zcl_heapsort DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    CLASS-METHODS sort
      IMPORTING
        !iv_table        TYPE abadr_tab_int4
      RETURNING
        VALUE(rv_result) TYPE abadr_tab_int4 .
  PROTECTED SECTION.
  PRIVATE SECTION.

    CLASS-METHODS heapify
      IMPORTING
        !iv_current TYPE int4
        !iv_len     TYPE int4
      CHANGING
        !cv_table   TYPE abadr_tab_int4 .
ENDCLASS.



CLASS ZCL_HEAPSORT IMPLEMENTATION.


* <SIGNATURE>---------------------------------------------------------------------------------------+
* | Static Private Method ZCL_HEAPSORT=>HEAPIFY
* +-------------------------------------------------------------------------------------------------+
* | [--->] IV_CURRENT                     TYPE        INT4
* | [--->] IV_LEN                         TYPE        INT4
* | [<-->] CV_TABLE                       TYPE        ABADR_TAB_INT4
* +--------------------------------------------------------------------------------------</SIGNATURE>
  METHOD heapify.
    DATA(left) = 2 * iv_current.
    DATA(right) = 2 * iv_current + 1.
    DATA(largest) = iv_current.
    IF left <= iv_len AND cv_table[ left ] > cv_table[ largest ].
      largest = left.
    ENDIF.

    IF right <= iv_len AND cv_table[ right ] > cv_table[ largest ].
      largest = right.
    ENDIF.

    IF largest <> iv_current.
      DATA(temp) = cv_table[ iv_current ].
      cv_table[ iv_current ] = cv_table[ largest ].
      cv_table[ largest ] = temp.
      heapify( EXPORTING iv_current = largest iv_len = iv_len
               CHANGING cv_table = cv_table ).
    ENDIF.

  ENDMETHOD.


* <SIGNATURE>---------------------------------------------------------------------------------------+
* | Static Public Method ZCL_HEAPSORT=>SORT
* +-------------------------------------------------------------------------------------------------+
* | [--->] IV_TABLE                       TYPE        ABADR_TAB_INT4
* | [<-()] RV_RESULT                      TYPE        ABADR_TAB_INT4
* +--------------------------------------------------------------------------------------</SIGNATURE>
  METHOD sort.
    rv_result = iv_table.
    DATA(heapsize) = lines( rv_result ).
    DATA(current) = heapsize DIV 2 .
    WHILE current > 0.
      heapify( EXPORTING iv_current = current iv_len = heapsize
               CHANGING cv_table = rv_result ).
      current = current - 1.
    ENDWHILE.

    DATA(j) = heapsize.
    WHILE j >= 1.
      DATA(temp) = rv_result[ 1 ].
      rv_result[ 1 ] = rv_result[ j ].
      rv_result[ j ] = temp.
      heapsize = heapsize - 1.
      heapify( EXPORTING iv_current = 1 iv_len = heapsize
               CHANGING cv_table = rv_result ).
      j = j - 1.
    ENDWHILE.
  ENDMETHOD.
ENDCLASS.